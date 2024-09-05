
import { InternalError, AlreadyExistsError, NotFoundError, PermissionDeniedError, UnauthenticatedError, RestaurantId } from '@models'; // Import necessary custom error classes
import { favoriteRestaurantsDataSource } from '../data-source';

//* https://firebase.google.com/docs/reference/js/firestore_.md#firestoreerrorcode
enum FirestoreErrorCode {
    OK = "OK",
    CANCELLED = "CANCELLED",
    UNKNOWN = "UNKNOWN",
    INVALID_ARGUMENT = "INVALID-ARGUMENT",
    DEADLINE_EXCEEDED = "DEADLINE-EXCEEDED",
    NOT_FOUND = "NOT-FOUND",
    ALREADY_EXISTS = "ALREADY-EXISTS",
    PERMISSION_DENIED = "PERMISSION-DENIED",
    RESOURCE_EXHAUSTED = "RESOURCE-EXHAUSTED",
    FAILED_PRECONDITION = "FAILED-PRECONDITION",
    ABORTED = "ABORTED",
    OUT_OF_RANGE = "OUT-OF-RANGE",
    UNIMPLEMENTED = "UNIMPLEMENTED",
    INTERNAL = "INTERNAL",
    UNAVAILABLE = "UNAVAILABLE",
    DATA_LOSS = "DATA-LOSS",
    UNAUTHENTICATED = "UNAUTHENTICATED"
}

class FavoriteRestaurantsRepository {

    async addFavoriteRestaurantId({ userId, restaurantId }: { userId: string, restaurantId: string }) {
        try {
            await favoriteRestaurantsDataSource.addFavoriteRestaurantId({ userId, restaurantId });
        } catch (error) {
            console.log(error);
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
                return new AlreadyExistsError(firebaseError.message);
            case FirestoreErrorCode.NOT_FOUND:
                return new NotFoundError(firebaseError.message);
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