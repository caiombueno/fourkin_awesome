
import { InternalError, FavoriteAlreadyExistsError, FavoriteNotFoundError, FavoritePermissionDeniedError, UnauthenticatedError, RestaurantId, PermissionDeniedError } from '@models'; // Import necessary custom error classes
import { favoriteRestaurantsDataSource } from '../data-source';

//* https://firebase.google.com/docs/reference/js/firestore_.md#firestoreerrorcode
enum FirestoreErrorCode {
    OK = "ok",
    CANCELLED = "cancelled",
    UNKNOWN = "unknown",
    INVALID_ARGUMENT = "invalid-argument",
    DEADLINE_EXCEEDED = "deadline-exceeded",
    NOT_FOUND = "not-found",
    ALREADY_EXISTS = "already-exists",
    PERMISSION_DENIED = "permission-denied",
    RESOURCE_EXHAUSTED = "resource-exhausted",
    FAILED_PRECONDITION = "failed-precondition",
    ABORTED = "aborted",
    OUT_OF_RANGE = "out-of-range",
    UNIMPLEMENTED = "unimplemented",
    INTERNAL = "internal",
    UNAVAILABLE = "unavailable",
    DATA_LOSS = "data-loss",
    UNAUTHENTICATED = "unauthenticated"
}

class FavoriteRestaurantsRepository {

    async addFavoriteRestaurantId({ userId, restaurantId }: { userId: string, restaurantId: string }) {
        try {
            await favoriteRestaurantsDataSource.addFavoriteRestaurantId({ userId, restaurantId });
        } catch (error) {
            throw this.handleFirestoreError(error);
        }
    }

    async getFavoriteRestaurantsIds({ userId }: { userId: string }): Promise<RestaurantId[]> {
        try {
            return await favoriteRestaurantsDataSource.getFavoriteRestaurantsIds({ userId });
        } catch (error) {
            throw this.handleFirestoreError(error);
        }
    }

    async removeFavoriteRestaurantId({ userId, restaurantId }: { userId: string, restaurantId: string }) {
        try {
            await favoriteRestaurantsDataSource.removeFavoriteRestaurantId({ userId, restaurantId });
        } catch (error) {
            throw this.handleFirestoreError(error);
        }
    }

    private handleFirestoreError(error: any) {
        const firebaseError = error as { code: string; message: string };
        switch (firebaseError.code) {
            case FirestoreErrorCode.ALREADY_EXISTS:
                return new FavoriteAlreadyExistsError(firebaseError.message);
            case FirestoreErrorCode.NOT_FOUND:
                return new FavoriteNotFoundError(firebaseError.message);
            case FirestoreErrorCode.PERMISSION_DENIED:
                return new PermissionDeniedError(firebaseError.message);
            case FirestoreErrorCode.UNAUTHENTICATED:
                return new UnauthenticatedError(firebaseError.message);
            case FirestoreErrorCode.INTERNAL:
                return new InternalError(firebaseError.message);
            default:
                return new InternalError(firebaseError.message); // Use generic InternalError for unknown cases
        }
    }
}

const favoriteRestaurantsRepository = new FavoriteRestaurantsRepository();
export { favoriteRestaurantsRepository, FirestoreErrorCode };