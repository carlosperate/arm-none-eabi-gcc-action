export default {
  rootDir: '../',
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  resolver: './config/jest-resolver.cjs',
  testEnvironment: 'node',
  testMatch: ['**/*.cionly.ts'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\.[jt]s$': [
      'ts-jest',
      {
        tsconfig: 'config/tsconfig.jest.json',
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!@actions/)',
  ],
  verbose: true,
}
