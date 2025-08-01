import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as cache from "@actions/cache";
import sha256File from "sha256-file";
import axios from 'axios';

import * as gcc from "./gcc";

async function get_sha256asc_of(tarball_url: string): Promise<string> {
  const sha256Url = tarball_url + ".sha256asc";
  const response = await axios.get<string>(sha256Url);
  const sha256Content = response.data;
  const sha256Match = sha256Content.match(/^([a-fA-F0-9]{64})/);
  if (sha256Match) {
    return sha256Match[1];
  }
  throw new Error("Could not extract SHA256 from the file.");
}

export async function install(
  release: string,
  platform: string,
  arch: string
): Promise<string> {
  const toolName = "gcc-aarch64-none-elf";

  // Get the GCC release info
  const distData = gcc.distributionUrl(release, platform, arch);
  let sha256sum = await get_sha256asc_of(distData.url);

  // Convert the GCC version to Semver so that it can be used with the GH cache
  const toolVersion = gcc.gccVersionToSemver(release);
  const cacheKey = `${toolName}-${toolVersion}-${platform}-${arch}`;
  const installPath = path.join(os.homedir(), cacheKey);
  core.debug(`Cache key: ${cacheKey}`);

  // Try to load the GCC installation from the cache
  let cacheKeyMatched: string | undefined = undefined;
  try {
    cacheKeyMatched = await cache.restoreCache([installPath], cacheKey);
    core.debug(`Matched cache.restoreCache() key: ${cacheKeyMatched}`);
  } catch (err) {
    core.warning(`⚠️ Could not find contents in the cache.\n${err.message}`);
  }
  if (cacheKeyMatched === cacheKey) {
    core.info(`Cache found: ${installPath}`);
    let cachesha256 = "sha256 not found in cached installation";
    try {
      cachesha256 = await fs.promises.readFile(
        path.join(installPath, "sha256asc"),
        { encoding: "utf8" }
      );
    } catch (err) {
      core.warning(
        `⚠️ Could not read the contents of the cached GCC version sha256.\n${err.message}`
      );
    }
    core.info(`Cached version sha256: ${cachesha256}`);
    if (cachesha256 !== sha256sum) {
      core.warning(
        `⚠️ Cached version sha256 does not match: ${cachesha256} != ${sha256sum}`
      );
    } else {
      core.info("Cached version loaded.");
      return installPath;
    }
  }

  core.info(
    `Cache miss, downloading GCC ${release} from ${distData.url} ; SHA256 ${sha256sum}`
  );
  const gccDownloadPath = await tc.downloadTool(distData.url);

  core.info(`GCC release downloaded, calculating SH6A25...`);
  const downloadHash = await sha256File(gccDownloadPath);
  core.info(`Downloaded file sha256: ${downloadHash}`);
  if (sha256sum && downloadHash !== sha256sum) {
    throw new Error(
      `Downloaded GCC sha256 doesn't match expected value: ${downloadHash} != ${sha256sum}`
    );
  }

  core.info(`Extracting ${gccDownloadPath}`);
  let extractedPath = "";
  if (distData.url.endsWith(".zip")) {
    extractedPath = await tc.extractZip(gccDownloadPath, installPath);
  } else if (distData.url.endsWith(".tar.bz2")) {
    extractedPath = await tc.extractTar(gccDownloadPath, installPath, "xj");
  } else if (distData.url.endsWith(".tar.xz")) {
    extractedPath = await tc.extractTar(gccDownloadPath, installPath, "xJ");
  } else {
    throw new Error(`Can't decompress ${distData.url}`);
  }

  // Adding installation to the cache
  core.info(`Adding to cache: ${extractedPath}`);
  await fs.promises.writeFile(
    path.join(extractedPath, "sha256asc"),
    downloadHash,
    { encoding: "utf8" }
  );
  try {
    await cache.saveCache([extractedPath], cacheKey);
  } catch (err) {
    core.warning(`⚠️ Could not save to the cache.\n${err.message}`);
  }

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
      if (result !== "") {
        return result;
      }
    }
  }
  return "";
}

export function findGcc(root: string, platform?: string): string {
  platform = platform || process.platform;
  return findGccRecursive(
    root,
    `aarch64-none-elf-gcc${platform === "win32" ? ".exe" : ""}`
  );
}
