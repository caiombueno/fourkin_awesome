
import { EmailAlreadyInUseError, InternalError, NetworkRequestFailedError, OperationNotAllowedError, TooManyRequestsError, UserDisabledError, UserNotFoundError, UserTokenExpiredError, WeakPasswordError, WrongPasswordError } from "@models";
import { authDataSource, EmailCredentials, User } from "../data-source";

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
            throw this.handleFirebaseError(firebaseError);
        }
    }

    async registerUser({ email, password }: EmailCredentials) {
        try {
            const userCredential = await authDataSource.register({ email, password });
            return userCredential.user;
        } catch (error) {
            const firebaseError = error as { code: string; message: string };
            throw this.handleFirebaseError(firebaseError);
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
            throw this.handleFirebaseError(firebaseError);
        }
    }


    get currentUser(): User | null {
        return authDataSource.currentUser;
    }

    onAuthStateChanged(callback: (user: User | null) => void) {
        return authDataSource.onAuthStateChanged(callback);
    }

    private handleFirebaseError(error: { code: string; message: string }) {
        switch (error.code) {
            case AuthErrorCode.USER_NOT_FOUND:
                return new UserNotFoundError();
            case AuthErrorCode.WRONG_PASSWORD:
                return new WrongPasswordError();
            case AuthErrorCode.EMAIL_ALREADY_IN_USE:
                return new EmailAlreadyInUseError();
            case AuthErrorCode.WEAK_PASSWORD:
                return new WeakPasswordError();
            case AuthErrorCode.USER_DISABLED:
                return new UserDisabledError();
            case AuthErrorCode.TOO_MANY_REQUESTS:
                return new TooManyRequestsError();
            case AuthErrorCode.NETWORK_REQUEST_FAILED:
                return new NetworkRequestFailedError();
            case AuthErrorCode.OPERATION_NOT_ALLOWED:
                return new OperationNotAllowedError();
            default:
                return new InternalError(error.message);
        }
    }
}

const authRepository = new AuthRepository();

export { authRepository, AuthRepository, AuthErrorCode };