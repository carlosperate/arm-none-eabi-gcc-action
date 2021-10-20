import * as fs from 'fs';
import * as path from 'path';

import fetch from 'node-fetch';
import tmp from 'tmp';
import * as rimraf from 'rimraf';

import * as gcc from '../src/gcc';
import * as setup from '../src/setup';

const TEMP_LOCAL_PATH = path.join(__dirname, '..', 'TESTS_TEMP_DELETE');

jest.setTimeout(5 * 60 * 1000);

beforeAll(() => {
  if (fs.existsSync(TEMP_LOCAL_PATH)) {
    rimraf.sync(TEMP_LOCAL_PATH);
  }
  process.env['RUNNER_TEMP'] = TEMP_LOCAL_PATH;
});

afterAll(() => {
  if (fs.existsSync(TEMP_LOCAL_PATH)) {
    rimraf.sync(TEMP_LOCAL_PATH);
  }
});

test('count gcc versions', () => {
  expect(gcc.availableVersions().length).toBeGreaterThan(0);
});

test('test url', () => {
  expect(gcc.distributionUrl('6-2017-q1', 'darwin').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-mac.tar.bz2'
  );
  expect(gcc.distributionUrl('6-2017-q1', 'darwin').md5).toBeNull();
  expect(gcc.distributionUrl('6-2017-q1', 'linux').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-linux.tar.bz2'
  );
  expect(gcc.distributionUrl('6-2017-q1', 'linux').md5).toBeNull();
  expect(gcc.distributionUrl('6-2017-q1', 'win32').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-win32-zip.zip'
  );
  expect(gcc.distributionUrl('6-2017-q1', 'win32').md5).toBeNull();
  expect(gcc.distributionUrl('9-2019-q4', 'linux').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2'
  );
  expect(gcc.distributionUrl('9-2019-q4', 'linux').md5).toStrictEqual('fe0029de4f4ec43cf7008944e34ff8cc');
  expect(gcc.distributionUrl('4.8-2013-q4', 'darwin').url).toStrictEqual(
    'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131218-mac.tar.bz2'
  );
  expect(gcc.distributionUrl('4.8-2013-q4', 'darwin').md5).toStrictEqual('850caa23f01ea8c1e6abcc3c217d36f7');
});

test('test url response', async () => {
  const url = gcc.distributionUrl('6-2017-q1', 'darwin').url;
  const resp = await fetch(url);
  expect(resp.status).toStrictEqual(200);
  expect(Number(resp.headers.get('Content-Length'))).toEqual(104170189);
});

describe('Real install in temp dirs.', () => {
  function hasGcc(dir: string): boolean {
    for (const filename of ['arm-none-eabi-gcc', 'arm-none-eabi-gcc.exe']) {
      const exe = path.join(dir, filename);
      if (fs.existsSync(exe)) {
        console.log(`${exe} exists`);
        return true;
      }
    }
    return false;
  }

  async function tmpInstall(release: string, platform?: string): Promise<void> {
    const dir = tmp.dirSync();
    const gccDir = path.join(dir.name, `gcc-${release}`);
    await setup.install(release, gccDir, platform);
    const gccPath = setup.findGcc(gccDir, platform);
    console.log(`gcc is at ${gccPath}`);
    expect(gccPath).not.toBe('');
    expect(hasGcc(gccPath)).toEqual(true);
    dir.removeCallback();
  }

  test('4.7-2013-q1 win32', async () => await tmpInstall('4.7-2013-q1', 'win32'));
  test('6-2017-q1 linux', async () => await tmpInstall('6-2017-q1', 'linux'));
  test('9-2019-q4 darwin', async () => await tmpInstall('9-2019-q4', 'darwin'));
  test('10.3-2021.07 win32', async () => await tmpInstall('10.3-2021.07', 'win32'));
  test('latest win32', async () => await tmpInstall('latest', 'win32'));
});
