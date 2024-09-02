import { ApolloError, ApolloQueryResult, ErrorPolicy, NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { DataSourceRequestError, EmptyResultError, RestaurantDetails, RestaurantId, RestaurantSummary } from '@models';
import queries from './queries';
import RestaurantDataSourceParser, { RestaurantDetailsRawData, RestaurantSummaryRawData } from './RestaurantDataSourceParser';

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

  async getRestaurantSummaryList({ location, limit, offset }: { location: string, limit: number, offset: number }): Promise<RestaurantSummary[]> {

    const result: ApolloQueryResult<RestaurantSummaryListData> = await this.client.query({
      query: queries.getRestaurantSummaryList,
      variables: { location, limit, offset },
    }).catch((error) => {
      const message = (error instanceof ApolloError) ? error.message : null;
      throw new DataSourceRequestError(message)
    });

    if (result.error || (result.errors && result.errors.length > 0)) {
      throw new DataSourceRequestError();
    }
    if (!result.data) throw new EmptyResultError();


    const restaurantSummaryRawData: RestaurantSummaryRawData[] = result.data.search.business;

    const restaurantSummaries: RestaurantSummary[] = RestaurantDataSourceParser.parseRestaurantSummaryList(restaurantSummaryRawData);

    return restaurantSummaries;

  }

  async getRestaurantDetails({ id }: { id: RestaurantId }): Promise<RestaurantDetails> {

    const result: ApolloQueryResult<RestaurantDetailsRawData> = await this.client.query({
      query: queries.getRestaurantDetails,
      variables: { id },
    }).catch((error) => {
      const message = (error instanceof ApolloError) ? error.message : null;
      throw new DataSourceRequestError(message)
    });

    if (result.error || (result.errors && result.errors.length > 0)) {
      throw new DataSourceRequestError();
    }
    if (!result.data) throw new EmptyResultError();


    const restaurantDetailsRawData: RestaurantDetailsRawData = result.data;

    const restaurantDetails: RestaurantDetails = RestaurantDataSourceParser.parseRestaurantDetails(restaurantDetailsRawData);

    return restaurantDetails;

  }
}

export const restaurantDataSource = new RestaurantDataSource();
export default RestaurantDataSource;

