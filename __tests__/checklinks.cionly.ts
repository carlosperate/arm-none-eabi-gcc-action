import * as gcc from '../src/gcc.js';

jest.setTimeout(5 * 60 * 1000);

// Some Arm download endpoints reject unfamiliar user agents with a challenge page redirect.
const userAgent = 'curl/8.5.0 (arm-none-eabi-gcc-action)';

// Short lived signed URL (e.g. an AWS link the Arm GitLab registry redirects to).
function isEphemeralUrl(url: string): boolean {
  const params = new URL(url).searchParams;
  return (
    params.has('X-Amz-Signature') || params.has('X-Amz-Expires') || (params.has('Expires') && params.has('Signature'))
  );
}

async function followRedirects(originalUrl: string): Promise<string> {
  const MAX_REDIRECTS = 5;
  let currentUrl = originalUrl;
  for (let attempt = 0; attempt < MAX_REDIRECTS; attempt++) {
    const response = await fetch(currentUrl, {
      method: 'HEAD',
      redirect: 'manual',
      headers: {'User-Agent': userAgent},
    });
    const statusCode = response.status;
    if (statusCode >= 300 && statusCode < 400) {
      const location = response.headers.get('location');
      if (!location) {
        break;
      }
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }
    break;
  }
  return currentUrl;
}

describe("Check links work and don't redirect.", () => {
  for (const version of gcc.availableVersions()) {
    for (const platform of ['darwin', 'linux', 'win32']) {
      for (const arch of ['x64', 'arm64']) {
        test(`URL ${version} ${platform} ${arch} is working`, async () => {
          let url: string;
          // Not all releases have builds for all platforms/archs
          try {
            url = gcc.distributionUrl(version, platform, arch).url;
          } catch (error) {
            return;
          }
          const finalUrl = await followRedirects(url);
          // The file must be reachable (following any redirects to the final target).
          const response = await fetch(finalUrl, {
            method: 'HEAD',
            headers: {'User-Agent': userAgent},
          });
          expect(response.status).toBe(200);
          // A url that redirects elsewhere is a stale link and the stored url should be
          // updated. Ephemeral urls (GitLab AWS signed links) redirect by design and are ok.
          if (finalUrl !== url && !isEphemeralUrl(finalUrl)) {
            throw new Error(
              `Redirect detected: ${url} -> ${finalUrl}. Please update the URL in src/gcc-versions.ts to the resolved URL.`
            );
          }
        });
      }
    }
  }
});
