import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest/presets/js-with-ts",
    // testEnvironment: "jsdom",
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/path/to/image-stub.js',
        '\\.(css|scss)$': '<rootDir>/path/to/style-stub.js',
        // Add more mappings for other non-JS modules if needed
    },
};

export default config;
