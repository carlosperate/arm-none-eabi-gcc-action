import * as core from '@actions/core';

import * as setup from './setup.js';
import {latestGccVersion} from './gcc.js';

async function run(): Promise<void> {
  try {
    let release = core.getInput('release');
    if (!release || release === 'latest') {
      release = latestGccVersion();
    }
    const useCache = core.getBooleanInput('use-cache');
    const useToolsCache = core.getBooleanInput('use-tools-cache');
    const installPath = await setup.install(release, process.platform, process.arch, useCache, useToolsCache);
    const gccPath = setup.findGcc(installPath);
    if (!gccPath) {
      throw new Error(`Could not find gcc executable in ${gccPath}`);
    }
    core.info(`Adding ${gccPath} to PATH.`);
    core.addPath(gccPath);

    // Export path for other tools
    core.setOutput('path', gccPath);
    const pathEnvVar = core.getInput('path-env-var');
    if (pathEnvVar) {
      core.exportVariable(pathEnvVar, gccPath);
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
