module.exports = {
    setupFiles: [
        "<rootDir>/jest.setup.js"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|react-navigation-shared-element|expo-constants|expo-modules-core|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|@unimodules/.*|unimodules/.*|sentry-expo|native-base)"
    ],
    moduleNameMapper: {
        "@data": "<rootDir>/src/data/$1",
        "@features": "<rootDir>/src/features/$1",
        "@components": "<rootDir>/src/components/$1",
        "^@navigation/(.*)$": "<rootDir>/src/navigation/$1",
        "@models": "<rootDir>/src/models/$1",
        "^@redux/(.*)$": "<rootDir>/src/redux/$1"
    },
    moduleFileExtensions: [
        "ios.js",
        "android.js",
        "js",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/index.ts"
    ],
    coverageReporters: [
        "json",
        "lcov",
        "text",
        "clover"
    ]
};
