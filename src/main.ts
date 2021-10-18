/* eslint-disable no-console */
import * as core from '@actions/core';
import * as path from 'path';

import tmp from 'tmp';

import * as setup from './setup';

async function run(): Promise<void> {
  try {
    const release = core.getInput('release');
    if (!release) {
      throw new Error('Missing release input.');
    }
    let directory = core.getInput('directory');
    if (!directory) {
      const tmpDir = tmp.dirSync();
      directory = path.join(tmpDir.name, `gcc-${release}`);
    }
    await setup.install(release, directory);
    const gccPath = setup.findGcc(directory);
    if (!gccPath) {
      throw new Error(`Could not find gcc executable in ${directory}`);
    }
    console.log(`Adding ${gccPath} to PATH.`);
    core.addPath(gccPath);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
