import { ApolloQueryResult, NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { ServerCommunicationFailureError, EmptyResultError, RestaurantSummary } from '@models';
import queries from './queries';
import RestaurantDataSourceParser, { RestaurantSummaryRawData } from './RestaurantDataSourceParser';

interface RestaurantSummaryListData {
  search: {
    total: number;
    business: RestaurantSummaryRawData[];
  };
}

class RestaurantDataSource {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    const apiToken: string = Constants.expoConfig?.extra?.yelpApiToken;
    this.client = new ApolloClient({
      uri: 'https://api.yelp.com/v3/graphql',
      cache: new InMemoryCache(),
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US',
        'x-requested-with': 'XMLHttpRequest',
      },
    });
  }

  async getRestaurantSummaryList(location: string, limit: number, offset: number): Promise<RestaurantSummary[]> {
    try {
      const result: ApolloQueryResult<RestaurantSummaryListData> = await this.client.query({
        query: queries.getRestaurantSummaryList,
        variables: { location, limit, offset },
      });

      if (result.error || (result.errors && result.errors.length > 0)) {
        throw new ServerCommunicationFailureError();
      }
      if (!result.data) throw new EmptyResultError();


      const restaurantSummaryRawData: RestaurantSummaryRawData[] = result.data.search.business;

      const restaurantSummaries: RestaurantSummary[] = RestaurantDataSourceParser.parseRestaurantSummaryList(restaurantSummaryRawData);

      return restaurantSummaries;
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      throw new ServerCommunicationFailureError();
    }
  }
}

export const restaurantDataSource = new RestaurantDataSource();
export default RestaurantDataSource;

