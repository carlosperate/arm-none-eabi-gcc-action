/* eslint-disable @typescript-eslint/naming-convention */

import * as core from "@actions/core";
import semverValid from "semver/functions/valid";

interface UrlData {
  url: string;
}

const versions: { [gccRelease: string]: { [platform: string]: UrlData } } = {
  "14.2.Rel1": {
    win32: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-mingw-w64-x86_64-aarch64-none-elf.zip",
    },
    mac_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-x86_64-aarch64-none-elf.tar.xz",
    },
    mac_arm64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-arm64-aarch64-none-elf.tar.xz",
    },
    linux_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-x86_64-aarch64-none-elf.tar.xz",
    },
    linux_aarch64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-aarch64-aarch64-none-elf.tar.xz",
    },
  },
  "13.3.Rel1": {
    win32: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-mingw-w64-i686-aarch64-none-elf.zip",
    },
    mac_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-x86_64-aarch64-none-elf.tar.xz",
    },
    mac_arm64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-arm64-aarch64-none-elf.tar.xz",
    },
    linux_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-x86_64-aarch64-none-elf.tar.xz",
    },
    linux_aarch64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-aarch64-aarch64-none-elf.tar.xz",
    },
  },
  "13.2.Rel1": {
    win32: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-mingw-w64-i686-aarch64-none-elf.zip",
    },
    mac_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-x86_64-aarch64-none-elf.tar.xz",
    },
    mac_arm64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-arm64-aarch64-none-elf.tar.xz",
    },
    linux_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-x86_64-aarch64-none-elf.tar.xz",
    },
    linux_aarch64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-aarch64-aarch64-none-elf.tar.xz",
    },
  },
  "12.3.Rel1": {
    win32: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-mingw-w64-i686-aarch64-none-elf.zip",
    },
    mac_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-x86_64-aarch64-none-elf.tar.xz",
    },
    mac_arm64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-arm64-aarch64-none-elf.tar.xz",
    },
    linux_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-x86_64-aarch64-none-elf.tar.xz",
    },
    linux_aarch64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-aarch64-aarch64-none-elf.tar.xz",
    },
  },
  "12.2.Rel1": {
    win32: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-mingw-w64-i686-aarch64-none-elf.zip",
    },
    mac_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-x86_64-aarch64-none-elf.tar.xz",
    },
    mac_arm64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-arm64-aarch64-none-elf.tar.xz",
    },
    linux_x86_64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-x86_64-aarch64-none-elf.tar.xz",
    },
    linux_aarch64: {
      url: "https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-aarch64-aarch64-none-elf.tar.xz",
    },
  },
};

export function availableVersions(): string[] {
  return Object.keys(versions);
}

export function latestGccVersion(): string {
  // Since ES6 (from node v8.x) JS objects are ordered
  return Object.keys(versions)[0];
}

export function distributionUrl(
  version: string,
  platform: string,
  arch: string
): UrlData {
  // Convert the node platform value to the versions URL keys
  let osName = "";
  switch (platform) {
    case "darwin":
      if (arch === "arm64") {
        if (versions[version].hasOwnProperty("mac_arm64")) {
          osName = "mac_arm64";
        } else {
          // If the GCC version does not have an arm64 release,
          // use the x86_64 version as rosetta will be able to run it
          osName = "mac_x86_64";
          core.warning(
            `No mac arm64 version found for GCC ${version}, using x86_64 version instead`
          );
        }
      } else {
        osName = "mac_x86_64";
      }
      break;
    case "linux":
      if (arch === "arm64") {
        osName = "linux_aarch64";
      } else {
        osName = "linux_x86_64";
      }
      break;
    case "win32":
      osName = "win32";
      break;
    default:
      throw new Error(`platform ${platform} is not supported`);
  }
  if (!versions.hasOwnProperty(version)) {
    throw new Error(
      `invalid GCC version ${version}. Available: ${availableVersions()}`
    );
  }
  if (!versions[version].hasOwnProperty(osName)) {
    throw new Error(
      `invalid platform ${osName} for GCC version ${version}.\n` +
        "The action README has the list of available versions and platforms."
    );
  }
  return versions[version][osName];
}

export function gccVersionToSemver(gccVersion: string): string {
  // This conversion is very specific to the current version format, but it
  // works with all the current versions. Tests have been added to check all
  // existing versions, but it will need updating if the format changes
  let gccVerStrArray = gccVersion.split("-");
  gccVerStrArray = gccVerStrArray.map((item) => {
    // Convert qn -> n, i.e. q4 -> 4
    if (item.startsWith("q") && item.length > 1) {
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
  gccVerStrArray = gccVerStrArray.join(".").split(".");

  gccVerStrArray = gccVerStrArray.map((item) => {
    // Convert Reln -> n, i.e. Rel1 -> 1
    if (item.startsWith("Rel") && item.length > 3) {
      return item.substring(3);
    } else {
      return item; // Everything else goes through
    }
  });

  // Remove any entry that cannot be cleanly converted to  number
  gccVerStrArray = gccVerStrArray.filter((item) => Number(item));
  const gccVerIntArray = gccVerStrArray.map((item) => Number(item));

  // If the end result is less than 3 entries something unexpected happened
  if (gccVerIntArray.length < 3) {
    throw new Error(
      `The GCC version did not result in 3 version parts: ${gccVerIntArray}`
    );
  }
  // If it has more than 3 entries we join any extras to the third
  else if (gccVerIntArray.length > 3) {
    gccVerIntArray[2] = parseInt(gccVerIntArray.slice(2).join(""));
  }
  const gccSemver = gccVerIntArray.slice(0, 3).join(".");

  if (!semverValid(gccSemver)) {
    throw new Error(
      `Could not convert the GCC version to a valid Semver: ${gccSemver}`
    );
  }

  return gccSemver;
}
