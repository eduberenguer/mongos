/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'src/repository/dog/dog.m.model.ts',
    'src/repository/shelter/shelter.m.model.ts',
    'src/repository/user/user.m.model.ts',
  ],
};
