import { DomainError } from "./DomainError";

class FavoriteRestaurantError extends DomainError {
    constructor(message: string, code: string = 'FAVORITE_RESTAURANT_ERROR') {
        super(message, code);
    }
}

export class FavoriteAlreadyExistsError extends FavoriteRestaurantError {
    constructor(message: string = 'Favorite restaurant already exists', code: string = 'FAVORITE_ALREADY_EXISTS') {
        super(message, code);
    }
}

export class FavoriteNotFoundError extends FavoriteRestaurantError {
    constructor(message: string = 'Favorite restaurant not found', code: string = 'FAVORITE_NOT_FOUND') {
        super(message, code);
    }
}

export class FavoritePermissionDeniedError extends FavoriteRestaurantError {
    constructor(message: string = 'Permission denied to access or modify favorite restaurants', code: string = 'FAVORITE_PERMISSION_DENIED') {
        super(message, code);
    }
}