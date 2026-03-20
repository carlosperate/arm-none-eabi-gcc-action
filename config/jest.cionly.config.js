export default {
  rootDir: '../',
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  testMatch: ['**/*.cionly.ts'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\.ts$': [
      'ts-jest',
      {
        tsconfig: 'config/tsconfig.jest.json',
      },
    ],
  },
  verbose: true,
}
