module.exports = {
    setupFiles: [
        "<rootDir>/jest.setup.js"
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testMatch: ['<rootDir>/tests/**/*.(test).{ts,tsx,js}'],

    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    preset: '@testing-library/react-native',
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(react-native|react-native/Libraries/Animated|@react-native|react-redux|expo-vector-icons|@react-navigation|@expo/vector-icons|@react-native-community|expo|@expo|expo-location|expo-modules-core|@unimodules|redux|redux-persist|expo-font|react-native-reanimated)/)',
    ],

    moduleNameMapper: {
        "@data": "<rootDir>/src/data/$1",
        "@features": "<rootDir>/src/features/$1",
        "^@features/(.*)$": "<rootDir>/src/features/$1",
        "@features/(.*)$": "<rootDir>/src/features/$1",
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
