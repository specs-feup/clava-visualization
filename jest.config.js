import { weaverConfig } from "@specs-feup/clava/code/WeaverConfiguration.js";

const config = {
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  // LARA publishes its Jest helpers as TypeScript, so they also need ts-jest
  // when resolved from node_modules in a clean CI installation.
  transformIgnorePatterns: ["node_modules/(?!(?:@specs-feup/lara)/)"],
  testEnvironment: "@specs-feup/lara/jest/jestEnvironment.js",
  testEnvironmentOptions: {
    weaverConfig,
  },
  globalSetup: "@specs-feup/lara/jest/jestGlobalSetup.js",
  globalTeardown: "@specs-feup/lara/jest/jestGlobalTeardown.js",
  setupFiles: ["@specs-feup/lara/jest/setupFiles/sharedJavaModule.js"],
  //notify: true,
  //notifyMode: "always",
  //verbose: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: ["src/**/*[^.d].(t|j)s"],
  coverageProvider: "v8",
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
};

export default config;
