'use strict';

const cache = jest.createMockFromModule('@actions/cache');
cache.saveCache = () => '';
cache.restoreCache = () => '';

module.exports = cache;
