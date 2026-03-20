const tsJestResolver = require('ts-jest-resolver');

module.exports = function (path, options) {
  if (path.startsWith('@actions/')) {
    try {
      return tsJestResolver(path, {
        ...options,
        conditions: [...(options.conditions || []), 'import'],
      });
    } catch {
      // fall through
    }
  }
  return tsJestResolver(path, options);
};
