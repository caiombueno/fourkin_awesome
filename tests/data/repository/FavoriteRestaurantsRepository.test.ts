import { favoriteRestaurantsDataSource, favoriteRestaurantsRepository, FirestoreErrorCode } from '@data';
import { AlreadyExistsError, NotFoundError, PermissionDeniedError, UnauthenticatedError, InternalError } from '@models';

// Mock Firebase Firestore functions
jest.mock('../../../src/data/data-source/FavoriteRestaurantsDataSource', () => ({
    favoriteRestaurantsDataSource: {
        addFavoriteRestaurantId: jest.fn(),
        getFavoriteRestaurantsIds: jest.fn(),
        removeFavoriteRestaurantId: jest.fn(),
    }
}));

describe('FavoriteRestaurantsRepository', () => {
    const userId = 'testUserId';
    const restaurantId = 'testRestaurantId';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addFavoriteRestaurantId', () => {
        it('should add a restaurant to favorites successfully', async () => {
            // Arrange
            (favoriteRestaurantsDataSource.addFavoriteRestaurantId as jest.Mock).mockResolvedValueOnce(undefined);

            // Act
            await favoriteRestaurantsRepository.addFavoriteRestaurantId({ userId, restaurantId });

            // Assert
            expect(favoriteRestaurantsDataSource.addFavoriteRestaurantId).toHaveBeenCalledWith({ userId, restaurantId });
        });

        it('should throw AlreadyExistsError if the restaurant is already added to favorites', async () => {
            // Arrange
            const error = { code: FirestoreErrorCode.ALREADY_EXISTS, message: 'Document already exists' };
            (favoriteRestaurantsDataSource.addFavoriteRestaurantId as jest.Mock).mockRejectedValueOnce(error);

            // Act & Assert
            await expect(favoriteRestaurantsRepository.addFavoriteRestaurantId({ userId, restaurantId }))
                .rejects.toThrow(AlreadyExistsError);
        });

        it('should throw UnauthenticatedError if the user is unauthenticated', async () => {
            // Arrange
            const error = { code: FirestoreErrorCode.UNAUTHENTICATED, message: 'User is unauthenticated' };
            (favoriteRestaurantsDataSource.addFavoriteRestaurantId as jest.Mock).mockRejectedValueOnce(error);

            // Act & Assert
            await expect(favoriteRestaurantsRepository.addFavoriteRestaurantId({ userId, restaurantId }))
                .rejects.toThrow(UnauthenticatedError);
        });

        it('should throw InternalError for unknown errors', async () => {
            // Arrange
            const error = { code: FirestoreErrorCode.UNKNOWN, message: 'Unknown error occurred' };
            (favoriteRestaurantsDataSource.addFavoriteRestaurantId as jest.Mock).mockRejectedValueOnce(error);

            // Act & Assert
            await expect(favoriteRestaurantsRepository.addFavoriteRestaurantId({ userId, restaurantId }))
                .rejects.toThrow(InternalError);
        });
    });

    describe('getFavoriteRestaurantsIds', () => {
        it('should return a list of favorite restaurant IDs', async () => {
            // Arrange
            const mockRestaurantIds = ['restaurant1', 'restaurant2'];
            (favoriteRestaurantsDataSource.getFavoriteRestaurantsIds as jest.Mock).mockResolvedValueOnce(mockRestaurantIds);

            // Act
            const restaurantIds = await favoriteRestaurantsRepository.getFavoriteRestaurantsIds({ userId });

            // Assert
            expect(favoriteRestaurantsDataSource.getFavoriteRestaurantsIds).toHaveBeenCalledWith({ userId });
            expect(restaurantIds).toEqual(mockRestaurantIds);
        });

        it('should throw NotFoundError if no favorite restaurants are found', async () => {
            // Arrange
            const error = { code: FirestoreErrorCode.NOT_FOUND, message: 'No documents found' };
            (favoriteRestaurantsDataSource.getFavoriteRestaurantsIds as jest.Mock).mockRejectedValueOnce(error);

            // Act & Assert
            await expect(favoriteRestaurantsRepository.getFavoriteRestaurantsIds({ userId }))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('removeFavoriteRestaurantId', () => {
        it('should remove a restaurant from favorites successfully', async () => {
            // Arrange
            (favoriteRestaurantsDataSource.removeFavoriteRestaurantId as jest.Mock).mockResolvedValueOnce(undefined);

            // Act
            await favoriteRestaurantsRepository.removeFavoriteRestaurantId({ userId, restaurantId });

            // Assert
            expect(favoriteRestaurantsDataSource.removeFavoriteRestaurantId).toHaveBeenCalledWith({ userId, restaurantId });
        });

        it('should throw PermissionDeniedError if the user does not have permission to remove the restaurant', async () => {
            // Arrange
            const error = { code: FirestoreErrorCode.PERMISSION_DENIED, message: 'Permission denied' };
            (favoriteRestaurantsDataSource.removeFavoriteRestaurantId as jest.Mock).mockRejectedValueOnce(error);

            // Act & Assert
            await expect(favoriteRestaurantsRepository.removeFavoriteRestaurantId({ userId, restaurantId }))
                .rejects.toThrow(PermissionDeniedError);
        });
    });
});