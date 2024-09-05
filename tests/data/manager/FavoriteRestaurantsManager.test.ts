import { favoriteRestaurantsManager } from '@data';
import { authRepository, favoriteRestaurantsRepository, restaurantRepository } from '@data';
import { RestaurantId, UnauthenticatedError } from '@models';

jest.mock('../../../src/data/repository', () => ({
    authRepository: {
        currentUser: {
            get: jest.fn(),
        }
    },
    favoriteRestaurantsRepository: {
        addFavoriteRestaurantId: jest.fn(),
        getFavoriteRestaurantsIds: jest.fn(),
        removeFavoriteRestaurantId: jest.fn(),
    },
    restaurantRepository: {
        getRestaurantSummary: jest.fn(),
    },
}));

describe('FavoriteRestaurantsManager', () => {


    describe('addFavoriteRestaurantId', () => {
        it('should add a favorite restaurant ID if the user is authenticated', async () => {
            // Arrange
            const restaurantId: RestaurantId = 'restaurant123';
            Object.defineProperty(authRepository, 'currentUser', {
                get: jest.fn(() => { return { uid: 'user123', email: '' } }),
            });

            (favoriteRestaurantsRepository.addFavoriteRestaurantId as jest.Mock).mockResolvedValue(undefined);

            // Act
            await favoriteRestaurantsManager.addFavoriteRestaurantId({ restaurantId });

            // Assert
            expect(favoriteRestaurantsRepository.addFavoriteRestaurantId).toHaveBeenCalledWith({
                userId: 'user123',
                restaurantId,
            });
        });

        it('should throw UnauthenticatedError if the user is not authenticated', async () => {
            // Arrange
            const restaurantId = 'restaurant123';
            jest.spyOn(authRepository, 'currentUser', 'get').mockReturnValue(null);

            // Act & Assert
            await expect(favoriteRestaurantsManager.addFavoriteRestaurantId({ restaurantId })).rejects.toThrow(UnauthenticatedError);
        });
    });

    describe('getFavoriteRestaurantsIds', () => {
        it('should return restaurant summaries for the user', async () => {
            // Arrange
            const restaurantIds = ['restaurant123', 'restaurant456'];
            const mockRestaurantSummaries = [
                { id: 'restaurant123', name: 'Restaurant 123' },
                { id: 'restaurant456', name: 'Restaurant 456' },
            ];
            Object.defineProperty(authRepository, 'currentUser', {
                get: jest.fn(() => { return { uid: 'user123', email: '' } }),
            });
            (favoriteRestaurantsRepository.getFavoriteRestaurantsIds as jest.Mock).mockResolvedValue(restaurantIds);
            (restaurantRepository.getRestaurantSummary as jest.Mock).mockImplementation(({ id }) =>
                mockRestaurantSummaries.find(summary => summary.id === id)
            );

            // Act
            const result = await favoriteRestaurantsManager.getFavoriteRestaurantsIds();

            // Assert
            expect(result.total).toBe(2);
            expect(result.restaurantSummaries).toEqual(mockRestaurantSummaries);
            expect(favoriteRestaurantsRepository.getFavoriteRestaurantsIds).toHaveBeenCalledWith({
                userId: 'user123',
            });
        });

        it('should throw UnauthenticatedError if the user is not authenticated', async () => {
            // Arrange
            jest.spyOn(authRepository, 'currentUser', 'get').mockReturnValue(null);

            // Act & Assert
            await expect(favoriteRestaurantsManager.getFavoriteRestaurantsIds()).rejects.toThrow(UnauthenticatedError);
        });
    });

    describe('removeFavoriteRestaurantId', () => {
        it('should remove a favorite restaurant ID if the user is authenticated', async () => {
            // Arrange
            const restaurantId = 'restaurant123';
            Object.defineProperty(authRepository, 'currentUser', {
                get: jest.fn(() => { return { uid: 'user123', email: '' } }),
            });

            // Act
            await favoriteRestaurantsManager.removeFavoriteRestaurantId({ restaurantId });

            // Assert
            expect(favoriteRestaurantsRepository.removeFavoriteRestaurantId).toHaveBeenCalledWith({
                userId: 'user123',
                restaurantId,
            });
        });

        it('should throw UnauthenticatedError if the user is not authenticated', async () => {
            // Arrange
            const restaurantId = 'restaurant123';
            jest.spyOn(authRepository, 'currentUser', 'get').mockReturnValue(null);

            // Act & Assert
            await expect(favoriteRestaurantsManager.removeFavoriteRestaurantId({ restaurantId })).rejects.toThrow(UnauthenticatedError);
        });
    });
});