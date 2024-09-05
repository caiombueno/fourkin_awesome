
import { EmailAlreadyInUseError, InternalError, NetworkRequestFailedError, OperationNotAllowedError, TooManyRequestsError, UserDisabledError, UserNotFoundError, UserTokenExpiredError, WeakPasswordError, WrongPasswordError } from "@models";
import { authDataSource, EmailCredentials } from "../data-source";

//* https://firebase.google.com/docs/reference/js/auth#autherrorcodes

enum AuthErrorCode {
    // User and Authentication-related Errors
    USER_NOT_FOUND = "auth/user-not-found",
    WRONG_PASSWORD = "auth/wrong-password",
    EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
    WEAK_PASSWORD = "auth/weak-password",
    USER_DISABLED = "auth/user-disabled",

    // Operational and Request-related Errors
    TOO_MANY_REQUESTS = "auth/too-many-requests",
    NETWORK_REQUEST_FAILED = "auth/network-request-failed",
    INTERNAL_ERROR = "auth/internal-error",
    OPERATION_NOT_ALLOWED = "auth/operation-not-allowed",

    // Token and Session Handling
    USER_TOKEN_EXPIRED = "auth/user-token-expired",
    REQUIRES_RECENT_LOGIN = "auth/requires-recent-login"
}
class AuthRepository {
    async loginUser({ email, password }: EmailCredentials) {
        try {
            const userCredential = await authDataSource.login({ email, password });
            return userCredential.user;
        } catch (error) {
            const firebaseError = error as { code: string; message: string };

            switch (firebaseError.code) {
                case AuthErrorCode.USER_NOT_FOUND:
                    throw new UserNotFoundError();
                case AuthErrorCode.WRONG_PASSWORD:
                    throw new WrongPasswordError();
                case AuthErrorCode.USER_DISABLED:
                    throw new UserDisabledError();
                case AuthErrorCode.TOO_MANY_REQUESTS:
                    throw new TooManyRequestsError();
                case AuthErrorCode.NETWORK_REQUEST_FAILED:
                    throw new NetworkRequestFailedError();
                default:
                    throw new InternalError(firebaseError.message);
            }
        }
    }

    async registerUser({ email, password }: EmailCredentials) {
        try {
            const userCredential = await authDataSource.register({ email, password });
            return userCredential.user;
        } catch (error) {
            const firebaseError = error as { code: string; message: string };

            switch (firebaseError.code) {
                case AuthErrorCode.EMAIL_ALREADY_IN_USE:
                    throw new EmailAlreadyInUseError();
                case AuthErrorCode.WEAK_PASSWORD:
                    throw new WeakPasswordError();
                case AuthErrorCode.OPERATION_NOT_ALLOWED:
                    throw new OperationNotAllowedError();
                case AuthErrorCode.NETWORK_REQUEST_FAILED:
                    throw new NetworkRequestFailedError();
                default:
                    throw new InternalError(firebaseError.message);
            }
        }
    }

    async logoutUser() {
        try {
            await authDataSource.logout();
        } catch (error) {
            const message = (error as { message: string }).message;
            throw new InternalError(message);

        }
    }

    async signInAnonymously() {
        try {
            const userCredential = await authDataSource.signInAnonymously();
            return userCredential.user;
        } catch (error) {
            const firebaseError = error as { code: string; message: string };

            switch (firebaseError.code) {
                case AuthErrorCode.TOO_MANY_REQUESTS:
                    throw new TooManyRequestsError();
                case AuthErrorCode.NETWORK_REQUEST_FAILED:
                    throw new NetworkRequestFailedError();
                default:
                    throw new InternalError(firebaseError.message);
            }
        }
    }
}

const authRepository = new AuthRepository();

export { authRepository, AuthRepository, AuthErrorCode };