import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as cache from '@actions/cache';
import md5File from 'md5-file';

import * as gcc from './gcc.js';
import type {GccDownloadInfo} from './gcc-versions.ts';

export async function install(
  release: string,
  platform: string,
  arch: string,
  useCache: boolean,
  useToolsCache: boolean
): Promise<string> {
  const toolName = 'gcc-arm-none-eabi';

  // Get the GCC release info
  const distData = await gcc.distributionUrl(release, platform, arch);

  // Convert the GCC version to Semver so that it can be used with the GH cache
  const toolVersion = gcc.gccVersionToSemver(release);
  const cacheKey = `${toolName}-${toolVersion}-${platform}-${arch}`;
  core.debug(`Cache key: ${cacheKey}`);

  // Try to use GCC installation from hosted tools cache
  if (useToolsCache) {
    const hcPath = await loadFromToolsCache(toolName, toolVersion, distData, arch, cacheKey, useCache);
    if (hcPath) {
      return hcPath;
    }
  }

  const installPath = path.join(os.homedir(), cacheKey);
  if (useCache) {
    const cachePath = await loadFromCache(installPath, cacheKey, distData);
    if (cachePath) {
      return cachePath;
    }
  }

  core.info(`Cache miss, downloading GCC ${release} from ${distData.url} ; MD5 ${distData.md5}`);
  const gccDownloadPath = await tc.downloadTool(distData.url);

  core.info(`GCC release downloaded, calculating MD5...`);
  const downloadHash = await md5File(gccDownloadPath);
  core.info(`Downloaded file MD5: ${downloadHash}`);
  if (distData.md5 && downloadHash !== distData.md5) {
    throw new Error(`Downloaded GCC MD5 doesn't match expected value: ${downloadHash} != ${distData.md5}`);
  }

  core.info(`Extracting ${gccDownloadPath}`);
  let extractedPath = '';
  if (distData.url.endsWith('.zip')) {
    extractedPath = await tc.extractZip(gccDownloadPath, installPath);
  } else if (distData.url.endsWith('.tar.bz2')) {
    extractedPath = await tc.extractTar(gccDownloadPath, installPath, 'xj');
  } else if (distData.url.endsWith('.tar.xz')) {
    extractedPath = await tc.extractTar(gccDownloadPath, installPath, 'xJ');
  } else {
    throw new Error(`Can't decompress ${distData.url}`);
  }

  // Adding installation to the cache
  if (useCache) {
    await saveToCache(extractedPath, downloadHash, cacheKey);
  }

  // Adding installation to hosted tools cache
  if (useToolsCache) {
    try {
      await tc.cacheDir(extractedPath, toolName, toolVersion, arch);
    } catch (err) {
      core.warning(`⚠️ Failed to copy GCC release to hosted tool cache.\n${err.message}`);
    }
  }

  return extractedPath;
}

function findGccRecursive(dir: string, executableName: string): string {
  const entries = fs.readdirSync(dir);
  for (const name of entries) {
    if (name === executableName) {
      return dir;
    }
    const p = path.join(dir, name);
    const st = fs.lstatSync(p);
    if (st.isDirectory()) {
      const result = findGccRecursive(p, executableName);
      if (result !== '') {
        return result;
      }
    }
  }
  return '';
}

export function findGcc(root: string, platform?: string): string {
  platform = platform || process.platform;
  return findGccRecursive(root, `arm-none-eabi-gcc${platform === 'win32' ? '.exe' : ''}`);
}

async function saveToCache(extractedPath: string, distHash: string, cacheKey: string): Promise<void> {
  core.info(`Adding to cache: ${extractedPath}`);
  await fs.promises.writeFile(path.join(extractedPath, 'md5.txt'), distHash, {
    encoding: 'utf8',
  });
  try {
    await cache.saveCache([extractedPath], cacheKey);
  } catch (err) {
    core.warning(`⚠️ Could not save to the cache.\n${err.message}`);
  }
}

// returns path to gcc installation downloaded from cache, or undefined if it wasn't found or was wrong.
async function loadFromCache(installPath: string, cacheKey: string, distData: GccDownloadInfo): Promise<string> {
  // Try to load the GCC installation from the cache
  let cacheKeyMatched: string | undefined = undefined;
  try {
    cacheKeyMatched = await cache.restoreCache([installPath], cacheKey);
    core.debug(`Matched cache.restoreCache() key: ${cacheKeyMatched}`);
  } catch (err) {
    core.warning(`⚠️ Could not find contents in the cache.\n${err.message}`);
    return '';
  }
  if (cacheKeyMatched === cacheKey) {
    core.info(`Cache found: ${installPath}`);
    let cacheMd5 = 'MD5 not found in cached installation';
    try {
      cacheMd5 = await fs.promises.readFile(path.join(installPath, 'md5.txt'), {
        encoding: 'utf8',
      });
    } catch (err) {
      core.warning(`⚠️ Could not read the contents of the cached GCC version MD5.\n${err.message}`);
      return '';
    }
    core.info(`Cached version MD5: ${cacheMd5}`);
    if (cacheMd5 !== distData.md5) {
      core.warning(`⚠️ Cached version MD5 does not match: ${cacheMd5} != ${distData.md5}`);
      return '';
    } else {
      core.info('Cached version loaded.');
      return installPath;
    }
  }
  return '';
}

async function loadFromToolsCache(
  toolName: string,
  toolVersion: string,
  distData: GccDownloadInfo,
  arch: string,
  cacheKey: string,
  useCache: boolean
): Promise<string> {
  // hosted tools cache should always have the tools matching its platform...
  const hcPath = tc.find(toolName, toolVersion, arch);
  const hcMd5 = await fs.promises.readFile(path.join(hcPath, 'md5.txt'), 'utf8').catch(e => {
    core.debug(`Failed to read tool cache version MD5: ${e}`);
    core.debug(`Not found in hosted tool cache @ ${hcPath}`);
  });
  if (hcMd5) {
    core.info(`Tool cache version found @ ${hcPath}`);
    core.info(`Tool cache version MD5: ${hcMd5}`);
    if (hcMd5 !== distData.md5) {
      core.warning(`⚠️ Tool cache version MD5 does not match: ${hcMd5} != ${distData.md5}`);
    } else {
      core.info('Tool cache version loaded.');
      if (useCache) {
        await saveToCache(hcPath, hcMd5, cacheKey);
      }
      return hcPath;
    }
  }
  return '';
}
