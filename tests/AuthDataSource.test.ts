// authDataSource.test.ts
import { AuthDataSource } from '@data';  // Adjust the path based on your project structure
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    initializeAuth: jest.fn(() => ({
        currentUser: { email: 'test@example.com' },
    })),
    getReactNativePersistence: jest.fn(),
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
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), expect.stringContaining(email), expect.stringContaining(password));
        expect(result.user.email).toEqual(email);
    });

    it('should register a new user with valid credentials', async () => {
        // Arrange
        const mockUserCredential = { user: { email: 'newuser@example.com' } };
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

        // Act
        const result = await authDataSource.register({ email: 'newuser@example.com', password: 'newpassword123' });

        // Assert
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'newuser@example.com', 'newpassword123');
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
});