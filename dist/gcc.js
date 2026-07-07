import * as core from '@actions/core';
import semver from 'semver';
import { gccVersions } from './gcc-versions.js';
export function availableVersions() {
    return Object.keys(gccVersions);
}
export function latestGccVersion() {
    // Since ES6 (from node v8.x) JS objects are ordered
    return Object.keys(gccVersions)[0];
}
export function distributionUrl(version, platform, arch) {
    // Convert the node platform value to the versions URL keys
    let osName = '';
    switch (platform) {
        case 'darwin':
            if (arch === 'arm64') {
                if (gccVersions[version].hasOwnProperty('mac_arm64')) {
                    osName = 'mac_arm64';
                }
                else {
                    // If the GCC version does not have an arm64 release,
                    // use the x86_64 version as rosetta will be able to run it
                    osName = 'mac_x86_64';
                    core.warning(`No mac arm64 version found for GCC ${version}, using x86_64 version instead`);
                }
            }
            else {
                osName = 'mac_x86_64';
            }
            break;
        case 'linux':
            if (arch === 'arm64') {
                osName = 'linux_aarch64';
            }
            else {
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
        throw new Error(`invalid platform ${osName} for GCC version ${version}.\n` +
            'The action README has the list of available versions and platforms.');
    }
    const distData = gccVersions[version][osName];
    // tc.downloadTool follows any redirect itself, so the stored url is downloaded directly.
    // Stale-URL detection lives in the CI link check test instead.
    return {
        url: distData.url,
        md5: distData.md5,
        sha256: distData.sha256,
    };
}
export function gccVersionToSemver(gccVersion) {
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
        }
        else {
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
    if (!semver.valid(gccSemver)) {
        throw new Error(`Could not convert the GCC version to a valid Semver: ${gccSemver}`);
    }
    return gccSemver;
}
