'use strict';

const originalTc = jest.requireActual('@actions/tool-cache');
const tc = jest.createMockFromModule('@actions/tool-cache');

tc.find = originalTc.find;
tc.cacheDir = originalTc.cacheDir;
tc.downloadTool = originalTc.downloadTool;
tc.extractZip = originalTc.extractZip;
tc.extractTar = originalTc.extractTar;

module.exports = tc;
