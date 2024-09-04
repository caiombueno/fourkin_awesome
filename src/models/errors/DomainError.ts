export abstract class DomainError extends Error {
    public readonly code?: string;

    constructor(message: string, code?: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}

// Restaurant-related Errors
export class RestaurantSummaryListFetchFailureError extends DomainError {
    constructor(message: string = 'Failed to fetch restaurants', code: string = 'FETCH_FAILURE') {
        super(message, code);
    }
}

export class NoRestaurantSummaryListFoundError extends DomainError {
    constructor(message: string = 'No restaurants were found', code: string = 'NO_DATA_FOUND') {
        super(message, code);
    }
}

export class RestaurantDetailsFetchFailureError extends DomainError {
    constructor(message: string = 'Failed to fetch restaurant details', code: string = 'FETCH_FAILURE') {
        super(message, code);
    }
}

export class NoRestaurantDetailsFoundError extends DomainError {
    constructor(message: string = 'No restaurant details were found', code: string = 'NO_DATA_FOUND') {
        super(message, code);
    }
}

// Authentication-related Errors
class AuthenticationError extends DomainError {
    constructor(message: string, code: string = 'AUTH_ERROR') {
        super(message, code);
    }
}

export class UserNotFoundError extends AuthenticationError {
    constructor(message: string = 'User not found', code: string = 'USER_NOT_FOUND') {
        super(message, code);
    }
}

export class InvalidCredentialsError extends AuthenticationError {
    constructor(message: string = 'Invalid email or password', code: string = 'INVALID_CREDENTIALS') {
        super(message, code);
    }
}

export class WrongPasswordError extends AuthenticationError {
    constructor(message: string = 'Wrong password provided', code: string = 'WRONG_PASSWORD') {
        super(message, code);
    }
}

export class EmailAlreadyInUseError extends AuthenticationError {
    constructor(message: string = 'Email is already in use', code: string = 'EMAIL_ALREADY_IN_USE') {
        super(message, code);
    }
}

export class UserAlreadyExistsError extends AuthenticationError {
    constructor(message: string = 'User already exists', code: string = 'USER_ALREADY_EXISTS') {
        super(message, code);
    }
}

export class WeakPasswordError extends AuthenticationError {
    constructor(message: string = 'Password is too weak', code: string = 'WEAK_PASSWORD') {
        super(message, code);
    }
}

export class UserDisabledError extends AuthenticationError {
    constructor(message: string = 'User account is disabled', code: string = 'USER_DISABLED') {
        super(message, code);
    }
}

export class TooManyRequestsError extends AuthenticationError {
    constructor(message: string = 'Too many requests, please try again later', code: string = 'TOO_MANY_REQUESTS') {
        super(message, code);
    }
}

export class NetworkRequestFailedError extends AuthenticationError {
    constructor(message: string = 'Network request failed, please check your connection', code: string = 'NETWORK_REQUEST_FAILED') {
        super(message, code);
    }
}

export class InternalError extends AuthenticationError {
    constructor(message: string = 'An internal error occurred', code: string = 'INTERNAL_ERROR') {
        super(message, code);
    }
}

export class OperationNotAllowedError extends AuthenticationError {
    constructor(message: string = 'Operation not allowed', code: string = 'OPERATION_NOT_ALLOWED') {
        super(message, code);
    }
}

export class UserTokenExpiredError extends AuthenticationError {
    constructor(message: string = 'User token has expired', code: string = 'USER_TOKEN_EXPIRED') {
        super(message, code);
    }
}

export class RequiresRecentLoginError extends AuthenticationError {
    constructor(message: string = 'This operation requires recent login', code: string = 'REQUIRES_RECENT_LOGIN') {
        super(message, code);
    }
}