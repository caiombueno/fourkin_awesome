import { RestaurantRepository, restaurantDataSource } from '@data';


import {
    NoRestaurantSummaryListFoundError,
    RestaurantSummaryListFetchFailureError,
    EmptyResultError,
    DataSourceRequestError,
    RestaurantSummaryList,
    RestaurantDetails,
    RestaurantSummary
} from '@models';


// Mock the restaurantDataSource
jest.mock('../../../src/data/data-source');

describe('RestaurantRepository', () => {
    let restaurantRepository: RestaurantRepository;

    beforeEach(() => {
        restaurantRepository = new RestaurantRepository();
    });

    // Tests for getRestaurantSummaryList
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

        it('should throw NoRestaurantSummaryListFoundError when EmptyResultError is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockRejectedValue(new EmptyResultError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 })
            ).rejects.toThrow(NoRestaurantSummaryListFoundError);
        });

        it('should throw RestaurantSummaryListFetchFailureError with message when DataSourceRequestError with message is thrown', async () => {
            // Arrange
            const errorMessage = 'Failed to fetch restaurant summary list';
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockRejectedValue(new DataSourceRequestError(errorMessage));

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 })
            ).rejects.toThrowError(new RestaurantSummaryListFetchFailureError(errorMessage));
        });

        it('should throw RestaurantSummaryListFetchFailureError when DataSourceRequestError without message is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantSummaryList as jest.Mock).mockRejectedValue(new DataSourceRequestError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantSummaryList({ location: 'New York', limit: 1, offset: 0 })
            ).rejects.toThrow(RestaurantSummaryListFetchFailureError);
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

        it('should throw NoRestaurantSummaryListFoundError when EmptyResultError is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockRejectedValue(new EmptyResultError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantDetails({ id: '1' })
            ).rejects.toThrow(NoRestaurantSummaryListFoundError);
        });

        it('should throw RestaurantSummaryListFetchFailureError with message when DataSourceRequestError with message is thrown', async () => {
            // Arrange
            const errorMessage = 'Failed to fetch restaurant details';
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockRejectedValue(new DataSourceRequestError(errorMessage));

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantDetails({ id: '1' })
            ).rejects.toThrowError(new RestaurantSummaryListFetchFailureError(errorMessage));
        });

        it('should throw RestaurantSummaryListFetchFailureError when DataSourceRequestError without message is thrown', async () => {
            // Arrange
            (restaurantDataSource.getRestaurantDetails as jest.Mock).mockRejectedValue(new DataSourceRequestError());

            // Act & Assert
            await expect(
                restaurantRepository.getRestaurantDetails({ id: '1' })
            ).rejects.toThrow(RestaurantSummaryListFetchFailureError);
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
