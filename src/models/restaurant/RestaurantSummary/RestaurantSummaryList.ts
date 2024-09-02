import { RestaurantSummary, RestaurantSummaryJson, RestaurantSummarySerializable } from "./RestaurantSummary";

export class RestaurantSummaryList {
    readonly restaurantSummaries: RestaurantSummary[];
    constructor(restaurantSummaries: RestaurantSummary[]) {
        this.restaurantSummaries = restaurantSummaries;
        Object.freeze(this);
    }

    toSerializable(): RestaurantSummarySerializable[] {
        return this.restaurantSummaries.map(restaurantSummary => restaurantSummary.toSerializable());
    }

    static fromJson(json: RestaurantSummaryListJson): RestaurantSummaryList {
        const restaurantSummaries = json.search.business.map((restaurantSummaryJson) => {
            try {

                return RestaurantSummary.fromJson(restaurantSummaryJson);
            } catch (_) {
                return null;
            }
        }).filter((restaurantSummary): restaurantSummary is RestaurantSummary => restaurantSummary !== null);

        return new RestaurantSummaryList(restaurantSummaries);
    }
}

export interface RestaurantSummaryListJson {
    search: {
        total: number;
        business: RestaurantSummaryJson[];
    };
}