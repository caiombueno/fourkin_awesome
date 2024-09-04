// authRepository.test.ts

import { authDataSource, AuthErrorCode, authRepository, AuthRepository, EmailCredentials } from "@data";
import { EmailAlreadyInUseError, InternalError, NetworkRequestFailedError, OperationNotAllowedError, TooManyRequestsError, UserDisabledError, UserNotFoundError, UserTokenExpiredError, WeakPasswordError, WrongPasswordError } from "@models";

jest.mock('../src/data/data-source/AuthDataSource/AuthDataSource', () => ({
    authDataSource: {
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
    }
}));

describe('AuthRepository', () => {
    const email = 'test@example.com';
    const password = 'password123';



    describe('loginUser', () => {

        it('should log in a user with valid credentials', async () => {
            // Arrange
            const mockUser = { email };
            (authDataSource.login as jest.Mock).mockResolvedValue({ user: mockUser });

            // Act
            const emailCredentials: EmailCredentials = { email, password };
            const user = await authRepository.loginUser(emailCredentials);

            // Assert
            expect(user).toEqual(mockUser);
            expect(authDataSource.login).toHaveBeenCalledWith({ email, password });
        });

        const mockLoginRejectedValue = (error: { code: string }) => {
            (authDataSource.login as jest.Mock).mockRejectedValue(error);
        };

        const expectLoginToThrow = async (error?: string | jest.Constructable | RegExp | Error) => {
            await expect(authRepository.loginUser({ email, password })).rejects.toThrow(error);
        }

        it('should throw UserNotFoundError if the user is not found', async () => {
            // Arrange
            const error = { code: AuthErrorCode.USER_NOT_FOUND };
            mockLoginRejectedValue(error);

            // Act & Assert
            await expectLoginToThrow(UserNotFoundError);
        });

        it('should throw WrongPasswordError if the password is incorrect', async () => {
            // Arrange
            const error = { code: AuthErrorCode.WRONG_PASSWORD };
            mockLoginRejectedValue(error);

            // Act & Assert
            await expectLoginToThrow(WrongPasswordError);
        });

        it('should throw UserDisabledError if the user is disabled', async () => {
            // Arrange
            const error = { code: AuthErrorCode.USER_DISABLED };
            mockLoginRejectedValue(error);

            // Act & Assert
            await expectLoginToThrow(UserDisabledError);
        });

        it('should throw TooManyRequestsError if too many requests are made', async () => {
            // Arrange
            const error = { code: AuthErrorCode.TOO_MANY_REQUESTS };
            mockLoginRejectedValue(error);

            // Act & Assert
            await expectLoginToThrow(TooManyRequestsError);
        });

        it('should throw NetworkRequestFailedError on network issues', async () => {
            // Arrange
            const error = { code: AuthErrorCode.NETWORK_REQUEST_FAILED };
            mockLoginRejectedValue(error);

            // Act & Assert
            await expectLoginToThrow(NetworkRequestFailedError);
        });

        it('should throw InternalError on unknown errors', async () => {
            // Arrange
            const error = { code: 'auth/unknown-error', message: 'Unknown error occurred' };
            mockLoginRejectedValue(error);

            // Act & Assert
            await expectLoginToThrow(InternalError);
        });
    });

    describe('registerUser', () => {
        it('should register a user with valid credentials', async () => {
            // Arrange
            const mockUser = { email };
            (authDataSource.register as jest.Mock).mockResolvedValue({ user: mockUser });

            // Act
            const user = await authRepository.registerUser({ email, password });

            // Assert
            expect(user).toEqual(mockUser);
            expect(authDataSource.register).toHaveBeenCalledWith({ email, password });
        });

        const mockRegisterRejectedValue = (error: { code: string }) => {
            (authDataSource.register as jest.Mock).mockRejectedValue(error);
        }

        const expectRegisterToThrow = async (error?: string | jest.Constructable | RegExp | Error) => {
            await expect(authRepository.registerUser({ email, password })).rejects.toThrow(error);
        }

        it('should throw EmailAlreadyInUseError if the email is already in use', async () => {
            // Arrange
            const error = { code: AuthErrorCode.EMAIL_ALREADY_IN_USE };
            mockRegisterRejectedValue(error);

            // Act & Assert
            await expectRegisterToThrow(EmailAlreadyInUseError);
        });

        it('should throw WeakPasswordError if the password is too weak', async () => {
            // Arrange
            const error = { code: AuthErrorCode.WEAK_PASSWORD };
            mockRegisterRejectedValue(error);

            // Act & Assert
            await expectRegisterToThrow(WeakPasswordError);
        });

        it('should throw OperationNotAllowedError if operation is not allowed', async () => {
            // Arrange
            const error = { code: AuthErrorCode.OPERATION_NOT_ALLOWED };
            mockRegisterRejectedValue(error);

            // Act & Assert
            await expectRegisterToThrow(OperationNotAllowedError);
        });
    });

    describe('logoutUser', () => {
        it('should log out the user', async () => {
            // Arrange
            (authDataSource.logout as jest.Mock).mockResolvedValue(undefined);

            // Act
            await authRepository.logoutUser();

            // Assert
            expect(authDataSource.logout).toHaveBeenCalled();
        });

        it('should throw InternalError if there is an error', async () => {
            // Arrange
            const error = { code: 'auth/user-token-expired' };
            (authDataSource.logout as jest.Mock).mockRejectedValue(error);

            // Act & Assert
            await expect(authRepository.logoutUser()).rejects.toThrow(InternalError);
        });
    });
});