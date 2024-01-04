/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['dist', '.d.ts', '.js', 'characters.repo.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [],
  resolver: 'jest-ts-webcompat-resolver',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/assetsMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  compilerOptions: {
    types: ['jest', '@testing-library/jest-dom'],
  },
};
