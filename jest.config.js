const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  // File extensions Jest should process
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  // Where test files live
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],

  // Enable coverage collection
  collectCoverage: true,

  // Output directory
  coverageDirectory: "coverage",

  // Coverage formats
  coverageReporters: [
    "text",
    "text-summary",
    "html",
    "lcov"
  ],

  // Which files to include in coverage
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",
    "!src/setupTests.ts",
    "!src/**/*.d.ts"
  ],

  // Minimum coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  }
};