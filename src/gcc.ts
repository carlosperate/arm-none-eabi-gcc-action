/* eslint-disable @typescript-eslint/naming-convention */

import * as core from '@actions/core';
import {HttpClient} from '@actions/http-client';
import semverValid from 'semver/functions/valid';

import {GccDownloadInfo, gccVersions} from './gcc-versions';

// Some Arm download endpoints reject unfamiliar user agents with a challenge page redirect.
const redirectHttpClient = new HttpClient('curl/8.5.0 (arm-none-eabi-gcc-action)', [], {allowRedirects: false});

async function followRedirects(originalUrl: string): Promise<string> {
  const MAX_REDIRECTS = 5;
  let currentUrl = originalUrl;
  for (let attempt = 0; attempt < MAX_REDIRECTS; attempt++) {
    const response = await redirectHttpClient.head(currentUrl);
    try {
      const statusCode = response.message.statusCode || 0;
      if (statusCode >= 300 && statusCode < 400) {
        const locationHeader = response.message.headers['location'];
        const locationValue = Array.isArray(locationHeader) ? locationHeader[0] : locationHeader;
        if (!locationValue) {
          core.debug(`Redirect for ${originalUrl} detected without location header at ${currentUrl}`);
          break;
        }
        const nextUrl = new URL(locationValue, currentUrl).toString();
        core.info(`Detected redirect (${statusCode}) for GCC download.`);
        core.info(`\tFollowing ${originalUrl}`);
        core.info(`\tto        ${nextUrl}`);
        if (attempt >= MAX_REDIRECTS - 1) {
          core.warning(`Maximum redirects reached for ${originalUrl}`);
        }
        currentUrl = nextUrl;
        continue;
      }
      break;
    } finally {
      // Drain the response body to free up resources, otherwise we may run out of sockets
      if (!response.message.complete) {
        try {
          await response.readBody();
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          core.debug(`Failed to drain redirect response body: ${message}`);
        }
      }
    }
  }
  return currentUrl;
}

export function availableVersions(): string[] {
  return Object.keys(gccVersions);
}

export function latestGccVersion(): string {
  // Since ES6 (from node v8.x) JS objects are ordered
  return Object.keys(gccVersions)[0];
}

export async function distributionUrl(version: string, platform: string, arch: string): Promise<GccDownloadInfo> {
  // Convert the node platform value to the versions URL keys
  let osName = '';
  switch (platform) {
    case 'darwin':
      if (arch === 'arm64') {
        if (gccVersions[version].hasOwnProperty('mac_arm64')) {
          osName = 'mac_arm64';
        } else {
          // If the GCC version does not have an arm64 release,
          // use the x86_64 version as rosetta will be able to run it
          osName = 'mac_x86_64';
          core.warning(`No mac arm64 version found for GCC ${version}, using x86_64 version instead`);
        }
      } else {
        osName = 'mac_x86_64';
      }
      break;
    case 'linux':
      if (arch === 'arm64') {
        osName = 'linux_aarch64';
      } else {
        osName = 'linux_x86_64';
      }
      break;
    case 'win32':
      osName = 'win32';
      break;
    default:
      throw new Error(`platform ${platform} is not supported`);
  }
  if (!gccVersions.hasOwnProperty(version)) {
    throw new Error(`invalid GCC version ${version}. Available: ${availableVersions()}`);
  }
  if (!gccVersions[version].hasOwnProperty(osName)) {
    throw new Error(
      `invalid platform ${osName} for GCC version ${version}.\n` +
        'The action README has the list of available versions and platforms.'
    );
  }
  const distData = gccVersions[version][osName];
  // Arm download files have been moved between servers in the past, so
  // we try to resolve any redirects here up-front to avoid issues later
  let resolvedUrl = distData.url;
  try {
    resolvedUrl = await followRedirects(distData.url);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    core.debug(`Redirect resolution failed for ${distData.url}: ${message}`);
  }
  return {
    url: resolvedUrl,
    urlOriginal: distData.url,
    md5: distData.md5,
  };
}

export function gccVersionToSemver(gccVersion: string): string {
  // This conversion is very specific to the current version format, but it
  // works with all the current versions. Tests have been added to check all
  // existing versions, but it will need updating if the format changes
  let gccVerStrArray = gccVersion.split('-');
  gccVerStrArray = gccVerStrArray.map(item => {
    // Convert qn -> n, i.e. q4 -> 4
    if (item.startsWith('q') && item.length > 1) {
      return item.substring(1);
    }
    // Convert yyyy.mm -> yyyymm, i.e. 2021.10 -> 202110
    else if (/^\d{4}\.\d{2}$/.test(item)) {
      return item.substr(0, 4) + item.substr(5);
    }
    // Everything else will be dealt later with the filtering
    else {
      return item;
    }
  });
  gccVerStrArray = gccVerStrArray.join('.').split('.');

  gccVerStrArray = gccVerStrArray.map(item => {
    // Convert Reln -> n, i.e. Rel1 -> 1
    if (item.startsWith('Rel') && item.length > 3) {
      return item.substring(3);
    } else {
      return item; // Everything else goes through
    }
  });

  // Remove any entry that cannot be cleanly converted to  number
  gccVerStrArray = gccVerStrArray.filter(item => Number(item));
  const gccVerIntArray = gccVerStrArray.map(item => Number(item));

  // If the end result is less than 3 entries something unexpected happened
  if (gccVerIntArray.length < 3) {
    throw new Error(`The GCC version did not result in 3 version parts: ${gccVerIntArray}`);
  }
  // If it has more than 3 entries we join any extras to the third
  else if (gccVerIntArray.length > 3) {
    gccVerIntArray[2] = parseInt(gccVerIntArray.slice(2).join(''));
  }
  const gccSemver = gccVerIntArray.slice(0, 3).join('.');

  if (!semverValid(gccSemver)) {
    throw new Error(`Could not convert the GCC version to a valid Semver: ${gccSemver}`);
  }

  return gccSemver;
}
