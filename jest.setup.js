jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            yelpApiToken: 'mock-api-token',
        },
    },
}));

jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
}));

jest.mock('@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js', () => {
    return () => '';
});

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(async () => ({
        status: 'granted',
    })),
    getLastKnownPositionAsync: jest.fn(async () => ({
        coords: {
            latitude: 37.7749,
            longitude: -122.4194,
        },
    })),
    getCurrentPositionAsync: jest.fn(async () => ({
        coords: {
            latitude: 37.7749,
            longitude: -122.4194,
        },
    })),
    reverseGeocodeAsync: jest.fn(async () => [
        {
            city: 'San Francisco',
            region: 'California',
            country: 'USA',
        },
    ]),
    PermissionStatus: {
        GRANTED: 'granted',
        DENIED: 'denied',
    },
}));

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    default: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
    },
}));

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),

}));


global.__DEV__ = true;