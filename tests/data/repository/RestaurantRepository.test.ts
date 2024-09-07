import { RestaurantRepository, restaurantDataSource } from '@data';

import {
    EmptyResultError,
    DataSourceRequestError,
    RestaurantSummaryList,
    RestaurantDetails,
    RestaurantSummary,
    NoRestaurantSummariesFoundError,
    RestaurantSummaryFetchError,
    NoRestaurantDetailsFoundError,
    RestaurantDetailsFetchError
} from '@models';


jest.mock('../../../src/data/data-source');

describe('RestaurantRepository', () => {
    let restaurantRepository: RestaurantRepository;

    beforeEach(() => {
        restaurantRepository = new RestaurantRepository();
    });

    describe('getRestaurantSummaryList', () => {
        it('should return restaurant summary list successfully', async () => {
            // Arrange
            const mockRestaurantSummaryList = new RestaurantSummaryList(
                1,
                [
                    new RestaurantSummary(
                        {
                            id: '1',
                            name: 'Test Restaurant 1',
                            price: '$$',
                            rating: 4.5,
                            photos: [],
                            categories: [],
                            isOpenNow: false
                        }
                    ),
                ]
            );
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockResolvedValue(mockRestaurantSummaryList);

            // Act
            const result = await restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 });

            // Assert
            expect(result).toBe(mockRestaurantSummaryList);
            expect(restaurantDataSource.getRestaurantSummaryList).toHaveBeenCalledWith({ location: 'New York', limit: 1, offset: 0 });
        });

        it('should throw NoRestaurantSummariesFoundError when EmptyResultError is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockRejectedValue(new EmptyResultError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 })
            ).rejects.toThrow(NoRestaurantSummariesFoundError);
        });

        it('should throw RestaurantSummaryFetchError with message when DataSourceRequestError with message is thrown', async () => {
            // Arrange
            const errorMessage = 'Failed to fetch restaurant summary list';
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockRejectedValue(new DataSourceRequestError(errorMessage));

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 })
            ).rejects.toThrowError(new RestaurantSummaryFetchError(errorMessage));
        });

        it('should throw RestaurantSummaryFetchError when DataSourceRequestError without message is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockRejectedValue(new DataSourceRequestError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 })
            ).rejects.toThrow(RestaurantSummaryFetchError);
        });

        it('should rethrow unknown errors', async () => {
            // Arrange
            const unknownError = new Error('Unknown error');
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockRejectedValue(unknownError);

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 })
            ).rejects.toThrow(unknownError);
        });
    });

    // Tests for getRestaurantDetails
    describe('getRestaurantDetails', () => {
        it('should return restaurant details successfully', async () => {
            // Arrange
            const mockRestaurantDetails = { /* mock data here */ } as RestaurantDetails;
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockResolvedValue(mockRestaurantDetails);

            // Act
            const result = await restaurantRepository.getRestaurantDetails({ id: '1' });

            // Assert
            expect(result).toBe(mockRestaurantDetails);
            expect(restaurantDataSource.getRestaurantDetails).toHaveBeenCalledWith({ id: '1' });
        });

        it('should throw NoRestaurantDetailsFoundError when EmptyResultError is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockRejectedValue(new EmptyResultError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantDetails({ id: '1' })
            ).rejects.toThrow(NoRestaurantDetailsFoundError);
        });

        it('should throw RestaurantDetailsFetchError with message when DataSourceRequestError with message is thrown', async () => {
            // Arrange
            const errorMessage = 'Failed to fetch restaurant details';
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockRejectedValue(new DataSourceRequestError(errorMessage));

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantDetails({ id: '1' })
            ).rejects.toThrowError(new RestaurantDetailsFetchError(errorMessage));
        });

        it('should throw RestaurantDetailsFetchError when DataSourceRequestError without message is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockRejectedValue(new DataSourceRequestError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantDetails({ id: '1' })
            ).rejects.toThrow(RestaurantDetailsFetchError);
        });

        it('should rethrow unknown errors', async () => {
            // Arrange
            const unknownError = new Error('Unknown error');
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockRejectedValue(unknownError);

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantDetails({ id: '1' })
            ).rejects.toThrow(unknownError);
        });
    });
});
