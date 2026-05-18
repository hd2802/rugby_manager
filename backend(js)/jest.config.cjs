module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],

  testMatch: [
    '<rootDir>/test/**/*.test.ts',
    '<rootDir>/test/**/*.spec.ts',
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ["<rootDir>/test/setupEnv.ts"],
  // collectCoverage: true, - commented out means that it only collects coverage when specified to do so
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/data-source.ts',
    '!src/index.ts',
    '!src/server.ts',
    '!src/models/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
  ],
  clearMocks: true,
};