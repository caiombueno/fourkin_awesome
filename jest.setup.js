// jest.setup.js
jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            yelpApiToken: 'mock-api-token',
        },
    },
}));

global.__DEV__ = true;