// jest.setup.js
jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            yelpApiToken: 'mock-api-token',
        },
    },
}));
