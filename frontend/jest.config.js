/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Ensures a browser-like environment
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // If you're using path aliases
  },
};
