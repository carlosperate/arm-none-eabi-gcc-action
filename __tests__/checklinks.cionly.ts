import * as gcc from '../src/gcc.js';
import {GccDownloadInfo} from '../src/gcc-versions.js';

jest.setTimeout(5 * 60 * 1000);

describe("Check links work and don't redirect.", () => {
  for (const version of gcc.availableVersions()) {
    for (const platform of ['darwin', 'linux', 'win32']) {
      for (const arch of ['x64', 'arm64']) {
        test(`URL ${version} ${platform} ${arch} is working`, async () => {
          let dist: GccDownloadInfo;
          // Not all releases have builds for all platforms/archs
          try {
            dist = await gcc.distributionUrl(version, platform, arch);
          } catch (error) {
            return;
          }
          const resolvedUrl = dist.resolvedUrl ?? dist.url;
          const response = await fetch(resolvedUrl, {
            method: 'HEAD',
            redirect: 'manual',
          });
          expect(response.status).toBe(200);
          // A non-ephemeral url that resolves elsewhere is a stale link and the stored url
          // should be updated. Ephemeral urls resolve to an unpinnable signed URL by design.
          if (!dist.ephemeralUrl && dist.resolvedUrl && dist.resolvedUrl !== dist.url) {
            throw new Error(
              `Redirect detected: ${dist.url} -> ${dist.resolvedUrl}. Please update the URL in src/gcc-versions.ts to the resolved URL.`
            );
          }
        });
      }
    }
  }
});
