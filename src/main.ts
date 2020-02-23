import * as core from '@actions/core'
import * as path from 'path'

import tmp from 'tmp'

import * as setup from '../src/setup'

async function run(): Promise<void> {
  try {
    const release = core.getInput('release')
    if (!release) {
      throw new Error('missing release')
    }
    let directory = core.getInput('directory')
    if (!directory) {
      const tmpDir = tmp.dirSync()
      directory = path.join(tmpDir.name, `gcc-${release}`)
    }
    await setup.install(release, directory)
    core.addPath(path.join(directory, 'bin'))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
