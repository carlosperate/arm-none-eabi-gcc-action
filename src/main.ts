import * as core from '@actions/core';

import * as setup from './setup';

async function run(): Promise<void> {
  try {
    const release = core.getInput('release');
    if (!release) {
      throw new Error('Missing release input.');
    }
    const installPath = await setup.install(release);
    const gccPath = setup.findGcc(installPath);
    if (!gccPath) {
      throw new Error(`Could not find gcc executable in ${gccPath}`);
    }
    core.info(`Adding ${gccPath} to PATH.`);
    core.addPath(gccPath);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
