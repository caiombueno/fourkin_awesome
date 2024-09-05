import { restaurantDataSource } from "../data-source";
import { NoRestaurantSummaryListFoundError, RestaurantSummaryListFetchFailureError, EmptyResultError, DataSourceError, DataSourceRequestError, RestaurantId, RestaurantDetails, RestaurantSummaryList, RestaurantSummary } from "@models";

class RestaurantRepository {
    async getRestaurantSummaryList({ location, limit, offset }: { location: string, limit: number, offset: number }): Promise<RestaurantSummaryList> {
        try {
            const restaurantSummaryList = await restaurantDataSource.getRestaurantSummaryList({ location: location, limit: limit, offset: offset });

            return restaurantSummaryList;
        } catch (error) {
            if (error instanceof DataSourceError) {
                if (error instanceof EmptyResultError) throw new NoRestaurantSummaryListFoundError()
                if (error instanceof DataSourceRequestError) {
                    const message = error.customMessage;
                    if (message)
                        throw new RestaurantSummaryListFetchFailureError(message);
                }
                throw new RestaurantSummaryListFetchFailureError();
            }
            throw error;
        }
    }

    async getRestaurantSummary({ id }: { id: RestaurantId }): Promise<RestaurantSummary> {
        try {
            const restaurantSummary = await restaurantDataSource.getRestaurantSummary({ id: id });

            return restaurantSummary
        } catch (error) {
            if (error instanceof DataSourceError) {
                if (error instanceof EmptyResultError) throw new NoRestaurantSummaryListFoundError()
                if (error instanceof DataSourceRequestError) {
                    const message = error.customMessage;
                    if (message)
                        throw new RestaurantSummaryListFetchFailureError(message);
                }
                throw new RestaurantSummaryListFetchFailureError();
            }
            throw error;
        }

    }


    async getRestaurantDetails({ id }: { id: RestaurantId }): Promise<RestaurantDetails> {
        try {
            const restaurantDetails = await restaurantDataSource.getRestaurantDetails({ id: id });

            return restaurantDetails;
        } catch (error) {
            if (error instanceof DataSourceError) {
                if (error instanceof EmptyResultError) throw new NoRestaurantSummaryListFoundError()
                if (error instanceof DataSourceRequestError) {
                    const message = error.customMessage;
                    if (message)
                        throw new RestaurantSummaryListFetchFailureError(message);
                }
                throw new RestaurantSummaryListFetchFailureError();
            }
            throw error;
        }
    }
}

const restaurantRepository = new RestaurantRepository();

export { RestaurantRepository, restaurantRepository };