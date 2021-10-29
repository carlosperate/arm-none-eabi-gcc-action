import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import md5File from 'md5-file';

import * as gcc from '../src/gcc';

export async function install(release: string, platform?: string): Promise<string> {
  const toolName = 'gcc-arm-none-eabi';
  platform = platform || process.platform;
  const distData = gcc.distributionUrl(release, platform);

  const cachedDirectory = tc.find(toolName, release, platform);
  if (cachedDirectory) {
    core.info(`Cached version found: ${cachedDirectory}`);
    let cacheMd5 = 'MD5 not found in cached installation';
    try {
      cacheMd5 = await fs.promises.readFile(path.join(cachedDirectory, 'md5.txt'), {encoding: 'utf8'});
    } catch (err) {
      core.warning('Could not read the contents of the cached version MD5.');
      core.warning(err.message);
    }
    core.info(`Cached version MD5: ${cacheMd5}`);
    if (cacheMd5 !== distData.md5) {
      core.info(`Cached version MD5 does not match: ${cacheMd5} != ${distData.md5}`);
    } else {
      core.info('Cached version loaded.');
      return cachedDirectory;
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
    extractedPath = await tc.extractZip(gccDownloadPath);
  } else if (distData.url.endsWith('.tar.bz2')) {
    extractedPath = await tc.extractTar(gccDownloadPath, undefined, 'xj');
  } else {
    throw new Error(`Can't decompress ${distData.url}`);
  }

  core.info(`Adding to cache: ${extractedPath}`);
  await fs.promises.writeFile(path.join(extractedPath, 'md5.txt'), downloadHash, {encoding: 'utf8'});
  const cachedPath = await tc.cacheDir(extractedPath, toolName, release, platform);
  core.addPath(cachedPath);

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
