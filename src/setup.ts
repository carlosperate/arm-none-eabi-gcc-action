/* eslint-disable no-console */
import * as fs from 'fs'
import * as url from 'url'
import fetch from 'node-fetch'
import tar from 'tar'
import bz2 from 'unbzip2-stream'
import * as unzipper from 'unzipper'

import * as gcc from '../src/gcc'

function urlExt(s: string): string {
  const u = url.parse(s)
  const components = u.path?.split('/')
  if (components && components?.length > 0) {
    const last = components[components?.length - 1]
    const dot = last.indexOf('.')
    if (dot >= 0) {
      return last.substr(dot).toLowerCase()
    }
  }
  return ''
}

export async function install(release: string, directory: string, platform?: string): Promise<void> {
  const distUrl = gcc.distributionUrl(release, platform || process.platform)
  console.log(`downloading gcc ${release} from ${distUrl}`)
  const resp = await fetch(distUrl)
  if (resp.status !== 200) {
    throw new Error(`invalid HTTP response code ${resp.status}`)
  }
  console.log(`extracting to ${directory}`)
  await fs.promises.mkdir(directory, {recursive: true})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let extractor: any
  switch (urlExt(distUrl)) {
    case '.zip':
      extractor = unzipper.Extract({path: directory})
      resp.body.pipe(extractor)
      break
    case '.tar.bz2':
      extractor = tar.x({strip: 1, C: directory})
      resp.body.pipe(bz2()).pipe(extractor)
      break
    default:
      throw new Error(`can't decompress ${urlExt(distUrl)}`)
  }
  await new Promise(function(resolve, reject) {
    // unzipper
    extractor.on('close', resolve)
    // tar
    extractor.on('end', resolve)
    extractor.on('error', reject)
  })
}
