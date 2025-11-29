import fetch from 'node-fetch';

import * as gcc from '../src/gcc';

jest.setTimeout(5 * 60 * 1000);

describe("Check links work and don't redirect.", () => {
  for (const version of gcc.availableVersions()) {
    for (const platform of ['darwin', 'linux', 'win32']) {
      for (const arch of ['x64', 'arm64']) {
        test(`URL ${version} ${platform} ${arch} is working`, async () => {
          let dist: gcc.UrlData;
          // Not all releases have builds for all platforms/archs
          try {
            dist = await gcc.distributionUrl(version, platform, arch);
          } catch (error) {
            return;
          }
          const response = await fetch(dist.url, {
            method: 'HEAD',
            redirect: 'manual',
          });
          expect(response.status).toBe(200);
          if (dist.urlOriginal && dist.urlOriginal !== dist.url) {
            throw new Error(
              `Redirect detected: ${dist.urlOriginal} -> ${dist.url}. Please update the URL in src/gcc.ts to the resolved URL.`
            );
          }
        });
      }
    }
  }
});
