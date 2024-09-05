import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@apollo/client';
import { RestaurantDataSource } from '@data';
import { DataSourceRequestError, EmptyResultError } from '@models';


jest.mock('@apollo/client');

describe('RestaurantDataSource', () => {
  let restaurantDataSource: RestaurantDataSource;
  let mockClient: ApolloClient<NormalizedCacheObject>;

  beforeEach(() => {
    mockClient = new ApolloClient({} as any); // Mocking ApolloClient with an empty object
    restaurantDataSource = new RestaurantDataSource(mockClient); // Inject the mock client
  });

  // Test getRestaurantSummaryList
  describe('getRestaurantSummaryList', () => {
    it('should retrieve restaurant summary list successfully', async () => {
      // Arrange
      const mockQuery = jest.fn().mockResolvedValue({
        data: {
          search: {
            business: [
              {
                id: '1',
                name: 'Test Restaurant 1',
                price: '$$',
                rating: 4.5,
                categories: [{ title: 'Italian' }],
              },
            ],
          },
        },
      } as ApolloQueryResult<any>);

      mockClient.query = mockQuery;

      // Act
      const result = await restaurantDataSource.getRestaurantSummaryList({
        location: 'New York',
        limit: 1,
        offset: 0,
      });

      // Assert
      expect(result.restaurantSummaries[0].name).toBe('Test Restaurant 1');
    });

    it('should throw DataSourceRequestError when query returns errors', async () => {
      // Arrange
      const mockQuery = jest.fn().mockResolvedValue({
        errors: [{ message: 'Something went wrong' }],
      } as Partial<ApolloQueryResult<any>>);

      mockClient.query = mockQuery;

      // Act & Assert
      await expect(
        restaurantDataSource.getRestaurantSummaryList({
          location: 'New York',
          limit: 1,
          offset: 0,
        })
      ).rejects.toThrow(DataSourceRequestError);
    });

    it('should throw EmptyResultError when no data is returned', async () => {
      // Arrange
      const mockQuery = jest.fn().mockResolvedValue({
        data: null,
      } as ApolloQueryResult<any>);

      mockClient.query = mockQuery;

      // Act & Assert
      await expect(
        restaurantDataSource.getRestaurantSummaryList({
          location: 'New York',
          limit: 1,
          offset: 0,
        })
      ).rejects.toThrow(EmptyResultError);
    });
  });

  // Test getRestaurantDetails
  describe('getRestaurantDetails', () => {
    it('should retrieve restaurant details successfully', async () => {
      // Arrange
      const mockQuery = jest.fn().mockResolvedValue({
        data: {
          business: {
            id: '1',
            name: 'Test Restaurant 1',
            price: '$$',
            rating: 4,
            categories: [{ title: 'Italian', alias: 'italian' }],
            hours: [{ is_open_now: true }],
            reviews: [{ id: '1', rating: 1, text: 'Great food!', user: { id: '1' } }],
            location: {
              city: 'New York',
              country: 'USA',
              address1: '123 Main St',
              state: 'NY',
              zip_code: '10001',
            },
          },
        },
      } as ApolloQueryResult<any>);

      mockClient.query = mockQuery;

      // Act
      const result = await restaurantDataSource.getRestaurantDetails({
        id: '1',
      });

      // Assert
      expect(result.name).toBe('Test Restaurant 1');
      expect(result.isOpenNow).toBe(true);
    });

    it('should throw DataSourceRequestError when query returns errors', async () => {
      // Arrange
      const mockQuery = jest.fn().mockResolvedValue({
        data: null,
        errors: [{ message: 'Something went wrong' }],
        loading: false,
        networkStatus: 7,
      } as ApolloQueryResult<any>);

      mockClient.query = mockQuery;

      // Act & Assert
      await expect(
        restaurantDataSource.getRestaurantDetails({ id: '1' })
      ).rejects.toThrow(DataSourceRequestError);
    });

    it('should throw EmptyResultError when no data is returned', async () => {
      // Arrange
      const mockQuery = jest.fn().mockResolvedValue({
        data: null,
      } as ApolloQueryResult<any>);

      mockClient.query = mockQuery;

      // Act & Assert
      await expect(
        restaurantDataSource.getRestaurantDetails({ id: '1' })
      ).rejects.toThrow(EmptyResultError);
    });
  });
});
