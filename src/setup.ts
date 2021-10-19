import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';

import * as gcc from '../src/gcc';

export async function install(release: string, directory: string, platform?: string): Promise<void> {
  const distUrl = gcc.distributionUrl(release, platform || process.platform);

  core.info(`Downloading gcc ${release} from ${distUrl}`);
  const gccDownloadPath = await tc.downloadTool(distUrl);

  core.info(`Extracting to ${directory}`);
  await fs.promises.mkdir(directory, {recursive: true});
  if (distUrl.endsWith('.zip')) {
    await tc.extractZip(gccDownloadPath, directory);
  } else if (distUrl.endsWith('.tar.bz2')) {
    await tc.extractTar(gccDownloadPath, directory, 'xj');
  } else {
    throw new Error(`Can't decompress ${distUrl}`);
  }
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
