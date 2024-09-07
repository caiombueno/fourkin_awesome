import { AuthDataSource, User } from '@data';  // Adjust the path based on your project structure
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@firebaseConfig'; // Import the actual mock for auth

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    signInAnonymously: jest.fn(),
    initializeAuth: jest.fn(() => ({
        currentUser: { email: 'test@example.com' },
    })),
    getReactNativePersistence: jest.fn(),
    onAuthStateChanged: jest.fn(),
    currentUser: null,
}));

jest.mock('../../../firebaseConfig', () => ({
    auth: {
        currentUser: null,
    },
}));

describe('AuthDataSource', () => {
    const email = 'test@example.com';
    const password = 'password123';

    const authDataSource = new AuthDataSource();

    it('should log in a user with valid credentials', async () => {
        // Arrange
        const mockUserCredential = { user: { email: 'test@example.com' } };
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

        // Act
        const result = await authDataSource.login({ email, password });

        // Assert
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password); // Use `auth` instead of `expect.any(Object)`
        expect(result.user.email).toEqual(email);
    });

    it('should register a new user with valid credentials', async () => {
        // Arrange
        const mockUserCredential = { user: { email: 'newuser@example.com' } };
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

        // Act
        const result = await authDataSource.register({ email: 'newuser@example.com', password: 'newpassword123' });

        // Assert
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'newuser@example.com', 'newpassword123'); // Use `auth` instead of `expect.any(Object)`
        expect(result.user.email).toEqual('newuser@example.com');
    });

    it('should log out the user', async () => {
        // Arrange
        (signOut as jest.Mock).mockResolvedValue(undefined);

        // Act
        await authDataSource.logout();

        // Assert
        expect(signOut).toHaveBeenCalled();
    });

    // Test for signInAnonymously
    it('should sign in anonymously', async () => {
        // Arrange
        const mockUserCredential = { user: { uid: 'anonymousUserId' } };
        (signInAnonymously as jest.Mock).mockResolvedValue(mockUserCredential);

        // Act
        const result = await authDataSource.signInAnonymously();

        // Assert
        expect(signInAnonymously).toHaveBeenCalled(); // No arguments expected
        expect(result.user.uid).toEqual('anonymousUserId');
    });

    // Test for the currentUser property
    it('should return the current user', () => {
        // Arrange
        const mockCurrentUser = { email: 'test@example.com', uid: '12345' } as User;
        (auth as any).currentUser = mockCurrentUser;

        // Act
        const currentUser = authDataSource.currentUser;

        // Assert
        expect(currentUser).toEqual(mockCurrentUser);
    });

    it('should return null if no user is signed in', () => {
        // Arrange
        (auth as any).currentUser = null;

        // Act
        const currentUser = authDataSource.currentUser;

        // Assert
        expect(currentUser).toBeNull();
    });
});