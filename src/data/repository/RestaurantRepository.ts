import { restaurantDataSource } from "../data-source";
import { RestaurantSummary, NoRestaurantSummaryListFoundError, RestaurantSummaryListFetchFailureError, EmptyResultError, DataSourceError } from "@models";

class RestaurantRepository {
    async getRestaurantSummaryList(location: string, limit: number, offset: number): Promise<RestaurantSummary[]> {
        try {
            const restaurantSummaries = await restaurantDataSource.getRestaurantSummaryList(location, limit, offset);

            return restaurantSummaries;
        } catch (error) {
            if (error instanceof DataSourceError) {
                if (error instanceof EmptyResultError) throw new NoRestaurantSummaryListFoundError()
                throw new RestaurantSummaryListFetchFailureError();
            }
            throw error;
        }
    }
}

const restaurantRepository = new RestaurantRepository();

export default RestaurantRepository;
export { restaurantRepository };