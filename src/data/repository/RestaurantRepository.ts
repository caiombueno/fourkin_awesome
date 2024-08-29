import { restaurantDataSource } from "@data/data-source";
import DataSourceError, { EmptyResultError } from "@models/errors/DataSourceError";
import { NoRestaurantSummaryListFoundError, RestaurantSummaryListFetchFailureError } from "@models/errors/DomainError";
import RestaurantSummary from "@models/RestaurantSummary";

export default class RestaurantRepository {
    async fetchRestaurantSummaryList(location: string, limit: number, offset: number): Promise<RestaurantSummary[]> {
        try {
            const restaurantSummaries = await restaurantDataSource.fetchRestaurantSummaryList(location, limit, offset);

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

export const restaurantRepository = new RestaurantRepository();