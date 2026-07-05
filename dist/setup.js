import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as cache from '@actions/cache';
import * as gcc from './gcc.js';
async function verifyChecksum(expectedTag, file) {
    const [algorithm, expected] = expectedTag.split(':');
    const hash = await new Promise((resolve, reject) => {
        const h = crypto.createHash(algorithm);
        fs.createReadStream(file)
            .on('error', reject)
            .on('data', chunk => h.update(chunk))
            .on('end', () => resolve(h.digest('hex')));
    });
    if (hash !== expected) {
        throw new Error(`Downloaded GCC ${algorithm} doesn't match expected value: ${hash} != ${expected}`);
    }
}
export async function install(release, platform, arch) {
    const toolName = 'gcc-arm-none-eabi';
    // Get the GCC release info
    const distData = await gcc.distributionUrl(release, platform, arch);
    // Download from the resolvedUrl, unless it is a short-lived signed URL (ephemeralUrl) that
    // expires and is method-locked (retrieved with HEAD, so downloading with GET fails)
    const downloadUrl = distData.ephemeralUrl ? distData.url : (distData.resolvedUrl ?? distData.url);
    // Prioritise SHA256 over MD5
    const checksumTag = distData.sha256 ? `sha256:${distData.sha256}` : distData.md5 ? `md5:${distData.md5}` : null;
    if (!checksumTag) {
        throw new Error(`No checksum (sha256 or md5) available for GCC ${release}; refusing to install unverified.`);
    }
    // The checksum is part of the cache key, so no need to verify cache hit
    const toolVersion = gcc.gccVersionToSemver(release);
    const cacheKey = `${toolName}-${toolVersion}-${platform}-${arch}-${checksumTag.replace(':', '-')}`;
    const installPath = path.join(os.homedir(), `${toolName}-${toolVersion}-${platform}-${arch}`);
    core.debug(`Cache key: ${cacheKey}`);
    // Try to load the GCC installation from the cache
    let cacheKeyMatched = undefined;
    try {
        cacheKeyMatched = await cache.restoreCache([installPath], cacheKey);
        core.debug(`Matched cache.restoreCache() key: ${cacheKeyMatched}`);
    }
    catch (err) {
        core.warning(`⚠️ Could not find contents in the cache.\n${err.message}`);
    }
    if (cacheKeyMatched === cacheKey) {
        core.info(`Cached version loaded: ${installPath}`);
        return installPath;
    }
    core.info(`Cache miss, downloading GCC ${release} from ${downloadUrl}`);
    const gccDownloadPath = await tc.downloadTool(downloadUrl);
    await verifyChecksum(checksumTag, gccDownloadPath);
    core.info(`Downloaded and verified (${checksumTag}).`);
    core.info(`Extracting ${gccDownloadPath}`);
    let extractedPath = '';
    if (downloadUrl.endsWith('.zip')) {
        extractedPath = await tc.extractZip(gccDownloadPath, installPath);
    }
    else if (downloadUrl.endsWith('.tar.bz2')) {
        extractedPath = await tc.extractTar(gccDownloadPath, installPath, 'xj');
    }
    else if (downloadUrl.endsWith('.tar.xz')) {
        extractedPath = await tc.extractTar(gccDownloadPath, installPath, 'xJ');
    }
    else {
        throw new Error(`Can't decompress ${downloadUrl}`);
    }
    // Adding installation to the cache
    core.info(`Adding to cache: ${extractedPath}`);
    try {
        await cache.saveCache([extractedPath], cacheKey);
    }
    catch (err) {
        core.warning(`⚠️ Could not save to the cache.\n${err.message}`);
    }
    return extractedPath;
}
function findGccRecursive(dir, executableName) {
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
export function findGcc(root, platform) {
    platform = platform || process.platform;
    return findGccRecursive(root, `arm-none-eabi-gcc${platform === 'win32' ? '.exe' : ''}`);
}
