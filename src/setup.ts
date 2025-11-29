import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as cache from '@actions/cache';
import md5File from 'md5-file';

import * as gcc from './gcc';

export async function install(release: string, platform: string, arch: string): Promise<string> {
  const toolName = 'gcc-arm-none-eabi';

  // Get the GCC release info
  const distData = await gcc.distributionUrl(release, platform, arch);

  // Convert the GCC version to Semver so that it can be used with the GH cache
  const toolVersion = gcc.gccVersionToSemver(release);
  const cacheKey = `${toolName}-${toolVersion}-${platform}-${arch}`;
  const installPath = path.join(os.homedir(), cacheKey);
  core.debug(`Cache key: ${cacheKey}`);

  // Try to load the GCC installation from the cache
  let cacheKeyMatched: string | undefined = undefined;
  try {
    cacheKeyMatched = await cache.restoreCache([installPath], cacheKey);
    core.debug(`Matched cache.restoreCache() key: ${cacheKeyMatched}`);
  } catch (err) {
    core.warning(`⚠️ Could not find contents in the cache.\n${err.message}`);
  }
  if (cacheKeyMatched === cacheKey) {
    core.info(`Cache found: ${installPath}`);
    let cacheMd5 = 'MD5 not found in cached installation';
    try {
      cacheMd5 = await fs.promises.readFile(path.join(installPath, 'md5.txt'), {encoding: 'utf8'});
    } catch (err) {
      core.warning(`⚠️ Could not read the contents of the cached GCC version MD5.\n${err.message}`);
    }
    core.info(`Cached version MD5: ${cacheMd5}`);
    if (cacheMd5 !== distData.md5) {
      core.warning(`⚠️ Cached version MD5 does not match: ${cacheMd5} != ${distData.md5}`);
    } else {
      core.info('Cached version loaded.');
      return installPath;
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
  core.info(`Adding to cache: ${extractedPath}`);
  await fs.promises.writeFile(path.join(extractedPath, 'md5.txt'), downloadHash, {encoding: 'utf8'});
  try {
    await cache.saveCache([extractedPath], cacheKey);
  } catch (err) {
    core.warning(`⚠️ Could not save to the cache.\n${err.message}`);
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
