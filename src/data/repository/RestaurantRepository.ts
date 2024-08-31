import { restaurantDataSource } from "../data-source";
import { RestaurantSummary, NoRestaurantSummaryListFoundError, RestaurantSummaryListFetchFailureError, EmptyResultError, DataSourceError, DataSourceRequestError } from "@models";

class RestaurantRepository {
    async getRestaurantSummaryList({ location, limit, offset }: { location: string, limit: number, offset: number }): Promise<RestaurantSummary[]> {
        try {
            const restaurantSummaries = await restaurantDataSource.getRestaurantSummaryList({ location: location, limit: limit, offset: offset });

            return restaurantSummaries;
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

export default RestaurantRepository;
export { restaurantRepository };