import { DomainError } from "./DomainError";

export class AuthorizationError extends DomainError {
    constructor(message: string, code: string = 'AUTHORIZATION_ERROR') {
        super(message, code);
    }
}

export class UnauthenticatedError extends AuthorizationError {
    constructor(message: string = 'User is not authenticated', code: string = 'UNAUTHENTICATED') {
        super(message, code);
    }
}

export class PermissionDeniedError extends AuthorizationError {
    constructor(message: string = 'Permission denied', code: string = 'PERMISSION_DENIED') {
        super(message, code);
    }
}