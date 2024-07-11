// Mocking OS for os.homedir()
jest.mock('os');

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {URL} from 'node:url';

import rimraf from 'rimraf';
import fetch from 'node-fetch';
import * as semver from 'semver';

import * as gcc from '../src/gcc';
import * as setup from '../src/setup';

const TEMP_LOCAL_PATH = path.join(__dirname, '..', 'TESTS_TEMP_DELETE');
const TEMP_HOME_DIR = path.join(TEMP_LOCAL_PATH, 'HOME');
const TEMP_CACHE_DIR = path.join(TEMP_LOCAL_PATH, 'CACHE');

jest.setTimeout(5 * 60 * 1000);

beforeAll(() => {
  if (fs.existsSync(TEMP_HOME_DIR)) rimraf.sync(TEMP_HOME_DIR);
  if (fs.existsSync(TEMP_CACHE_DIR)) rimraf.sync(TEMP_CACHE_DIR);
  if (fs.existsSync(TEMP_LOCAL_PATH)) rimraf.sync(TEMP_LOCAL_PATH);

  fs.mkdirSync(TEMP_LOCAL_PATH);
  fs.mkdirSync(TEMP_HOME_DIR);
  fs.mkdirSync(TEMP_CACHE_DIR);

  // Mocking os.homedir() result at the top of this file
  console.warn(`Testing home path: ${os.homedir()}`);

  // Env vars needed for the GitHub actions libs
  process.env['RUNNER_TEMP'] = TEMP_LOCAL_PATH;
  process.env['RUNNER_TOOL_CACHE'] = TEMP_CACHE_DIR;

  // Try to reduce GH lib verbosity
  process.env['ACTIONS_STEP_DEBUG'] = '';
  process.env['RUNNER_DEBUG'] = '';
});

afterAll(done => {
  if (fs.existsSync(TEMP_LOCAL_PATH)) {
    rimraf(TEMP_LOCAL_PATH, {disableGlob: true}, function () {
      done();
    });
  }
});

test('count gcc versions', () => {
  expect(gcc.availableVersions().length).toBeGreaterThan(0);
});

test('test url', () => {
  expect(gcc.distributionUrl('6-2017-q1', 'darwin').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-mac.tar.bz2'
  );
  expect(gcc.distributionUrl('6-2017-q1', 'darwin').md5).toStrictEqual('709c86af4c92d17bd5fb9dcfe00ffd6d');

  expect(gcc.distributionUrl('6-2017-q1', 'linux').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-linux.tar.bz2'
  );
  expect(gcc.distributionUrl('6-2017-q1', 'linux').md5).toStrictEqual('30004c24f4632bc594952462bb0cd1c9');

  expect(gcc.distributionUrl('6-2017-q1', 'win32').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-win32-zip.zip'
  );
  expect(gcc.distributionUrl('6-2017-q1', 'win32').md5).toStrictEqual('ec8b98945d4faf0c28a05bcdc1c2e537');

  expect(gcc.distributionUrl('9-2019-q4', 'linux').url).toStrictEqual(
    'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2'
  );
  expect(gcc.distributionUrl('9-2019-q4', 'linux').md5).toStrictEqual('fe0029de4f4ec43cf7008944e34ff8cc');

  expect(gcc.distributionUrl('4.8-2013-q4', 'darwin').url).toStrictEqual(
    'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131218-mac.tar.bz2'
  );
  expect(gcc.distributionUrl('4.8-2013-q4', 'darwin').md5).toStrictEqual('850caa23f01ea8c1e6abcc3c217d36f7');
});

test('latest points to a known latest release', async () => {
  const knownLatestRelease = '13.3.Rel1';

  const latestRelease = gcc.latestGccVersion();

  expect(latestRelease).toEqual(knownLatestRelease);
});

test('GCC versions to valid Semver', async () => {
  const gccVersionsAndSemver = [
    {
      gccVer: '11.3.Rel1',
      semver: '11.3.1',
    },
    {
      gccVer: '10.3-2021.10',
      semver: '10.3.202110',
    },
    {
      gccVer: '10.3-2021.07',
      semver: '10.3.202107',
    },
    {
      gccVer: '10-2020-q4',
      semver: '10.2020.4',
    },
    {
      gccVer: '5-2016-q2',
      semver: '5.2016.2',
    },
    {
      gccVer: '4.9-2015-q2',
      semver: '4.9.20152',
    },
    // This GCC version doesn't exists, but tests a valid combination
    {
      gccVer: '10.3-2024.03-q45',
      semver: '10.3.20240345',
    },
  ];

  for (const version of gccVersionsAndSemver) {
    const gccSemver = gcc.gccVersionToSemver(version.gccVer);
    expect(semver.valid(gccSemver)).toEqual(version.semver);
  }
});

test('Invalid GCC versions', async () => {
  expect(() => {
    gcc.gccVersionToSemver('10-2020');
  }).toThrow('The GCC version did not result in 3 version parts: 10,2020');

  expect(() => {
    gcc.gccVersionToSemver('10-2020.02');
  }).toThrow('The GCC version did not result in 3 version parts: 10,202002');

  expect(() => {
    gcc.gccVersionToSemver('11-2021-q2sometext3');
  }).toThrow('The GCC version did not result in 3 version parts: 11,2021');

  expect(() => {
    gcc.gccVersionToSemver('11.3.Rel1sometext3');
  }).toThrow('The GCC version did not result in 3 version parts: 11,3');

  expect(() => {
    gcc.gccVersionToSemver('11-2021-123e100');
  }).toThrow('Could not convert the GCC version to a valid Semver: 11.2021.1.23e+102');
});

test('Each GCC versions into a unique and valid Semver', async () => {
  const gccVersions = gcc.availableVersions();
  const gccSemverList: string[] = [];
  for (const gccVer of gccVersions) {
    const gccSemver = gcc.gccVersionToSemver(gccVer);
    expect(semver.valid(gccSemver)).toEqual(gccSemver);
    if (gccSemverList.includes(gccSemver)) {
      throw new Error(`Generated Semver is a duplicate: ${gccSemver}`);
    }
    gccSemverList.push(gccSemver);
  }
});

describe('Check links work.', () => {
  for (const version of gcc.availableVersions()) {
    for (const platform of ['darwin', 'linux', 'win32']) {
      const fileUrl = gcc.distributionUrl(version, platform).url;
      const fileName = path.basename(new URL(fileUrl).pathname);

      test(`URL ${fileName} is working`, async () => {
        const response = await fetch(fileUrl, {method: 'HEAD'});
        expect(response.status).toBe(200);
      });
    }
  }
});

describe('Real install in temp dirs.', () => {
  function hasGcc(dir: string): boolean {
    for (const filename of ['arm-none-eabi-gcc', 'arm-none-eabi-gcc.exe']) {
      const exe = path.join(dir, filename);
      if (fs.existsSync(exe)) {
        console.log(`✅ Executable exists: ${exe}`);
        return true;
      }
    }
    return false;
  }

  async function tmpInstall(release: string, platform: string): Promise<void> {
    const installPath = await setup.install(release, platform);
    const gccPath = setup.findGcc(installPath, platform);
    expect(gccPath).not.toBe('');
    expect(hasGcc(gccPath)).toBeTruthy();
  }

  test('4.7-2013-q1 win32', async () => await tmpInstall('4.7-2013-q1', 'win32'));
  test('6-2017-q1 linux', async () => await tmpInstall('6-2017-q1', 'linux'));
  test('9-2019-q4 darwin', async () => await tmpInstall('9-2019-q4', 'darwin'));
  test('10.3-2021.07 win32', async () => await tmpInstall('10.3-2021.07', 'win32'));
  test('13.3.Rel1 linux', async () => await tmpInstall('13.3.Rel1', 'linux'));
  test('13.3.Rel1 darwin', async () => await tmpInstall('13.3.Rel1', 'darwin'));
  test('13.3.Rel1 win32', async () => await tmpInstall('13.3.Rel1', 'win32'));
});
