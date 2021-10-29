import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as cache from '@actions/cache';
import md5File from 'md5-file';

import * as gcc from './gcc';

export async function install(release: string, platform?: string): Promise<string> {
  const toolName = 'gcc-arm-none-eabi';
  const toolPlatform = platform || process.platform;

  // Get the GCC release info
  const distData = gcc.distributionUrl(release, toolPlatform);

  // Convert the GCC version to Semver so that it can be used with the GH cache
  const toolVersion = gcc.gccVersionToSemver(release);
  const globalCacheKey = `${toolName}-${toolVersion}-${toolPlatform}`;
  const installPath = path.join(os.homedir(), globalCacheKey);
  core.debug(`Global cache key: ${globalCacheKey}`);

  let checkCachedMd5 = false;
  let finalCacheDir: string | null = null;
  // First check the current run cache
  const cachedDirectory = tc.find(toolName, toolVersion, toolPlatform);
  if (cachedDirectory) {
    core.info(`Session cache found: ${cachedDirectory}`);
    checkCachedMd5 = true;
    finalCacheDir = cachedDirectory;
  } else {
    // If there isn't a local hit check the global cache between runs
    try {
      const cacheKeyMatched = await cache.restoreCache([installPath], globalCacheKey);
      core.debug(`Matched cache.restoreCache() key: ${cacheKeyMatched}`);
      if (cacheKeyMatched === globalCacheKey) {
        core.info(`Global cache found: ${installPath}`);
        checkCachedMd5 = true;
        finalCacheDir = installPath;
      }
    } catch (err) {
      core.warning(`Could not read the contents of the cached version MD5.\n${err.message}`);
    }
  }

  // If either cache was found, verify the MD5
  if (checkCachedMd5 && finalCacheDir) {
    let cacheMd5 = 'MD5 not found in cached installation';
    try {
      cacheMd5 = await fs.promises.readFile(path.join(finalCacheDir, 'md5.txt'), {encoding: 'utf8'});
    } catch (err) {
      core.warning(`Could not read the contents of the cached version MD5.\n${err.message}`);
    }
    core.info(`Cached version MD5: ${cacheMd5}`);
    if (cacheMd5 !== distData.md5) {
      core.info(`Cached version MD5 does not match: ${cacheMd5} != ${distData.md5}`);
    } else {
      core.info('Cached version loaded.');
      return finalCacheDir;
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
  } else {
    throw new Error(`Can't decompress ${distData.url}`);
  }

  // Adding to the two different caches
  core.info(`Adding to both caches: ${extractedPath}`);
  await fs.promises.writeFile(path.join(extractedPath, 'md5.txt'), downloadHash, {encoding: 'utf8'});
  try {
    await tc.cacheDir(extractedPath, toolName, toolVersion, toolPlatform);
  } catch (err) {
    core.warning(`Could not save to the local cache.\n${err.message}`);
  }
  try {
    await cache.saveCache([extractedPath], globalCacheKey);
  } catch (err) {
    core.warning(`Could not save to the global cache.\n${err.message}`);
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
