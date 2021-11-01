'use strict';

const path = require('path');

const TEMP_LOCAL_PATH = path.join(__dirname, '..', 'TESTS_TEMP_DELETE');
const homeTempPath = path.join(TEMP_LOCAL_PATH, 'HOME');

const os = jest.createMockFromModule('os');
os.homedir = () => homeTempPath;

module.exports = os;
