import { ApolloError, ApolloQueryResult, ErrorPolicy, NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { DataSourceRequestError, EmptyResultError, RestaurantDetails, RestaurantDetailsJson, RestaurantId, RestaurantSummary, RestaurantSummaryJson, RestaurantSummaryList, RestaurantSummaryListJson } from '@models';
import queries from './queries';



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

  async getRestaurantSummaryList({ location, limit, offset }: { location: string, limit: number, offset: number }): Promise<RestaurantSummaryList> {

    const result: ApolloQueryResult<RestaurantSummaryListJson> = await this.client.query({
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


    const restaurantSummaryListJson: RestaurantSummaryListJson = result.data;

    const restaurantSummaries: RestaurantSummaryList = RestaurantSummaryList.fromJson(restaurantSummaryListJson);

    return restaurantSummaries;

  }

  async getRestaurantDetails({ id }: { id: RestaurantId }): Promise<RestaurantDetails> {

    const result: ApolloQueryResult<RestaurantDetailsJson> = await this.client.query({
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

    const restaurantDetailsJson: RestaurantDetailsJson = result.data;

    const restaurantDetails = RestaurantDetails.fromJson(restaurantDetailsJson);

    return restaurantDetails;

  }
}

export const restaurantDataSource = new RestaurantDataSource();
export default RestaurantDataSource;

