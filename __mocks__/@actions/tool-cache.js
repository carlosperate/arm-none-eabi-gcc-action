"use strict";

const originalTc = require("@actions/tool-cache");
const tc = jest.createMockFromModule("@actions/tool-cache");

tc.find = () => "";
tc.cacheDir = () => "";
tc.downloadTool = originalTc.downloadTool;
tc.extractZip = originalTc.extractZip;
tc.extractTar = originalTc.extractTar;

module.exports = tc;
