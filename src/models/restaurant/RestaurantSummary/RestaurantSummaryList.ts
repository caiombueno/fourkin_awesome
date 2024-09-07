import { RestaurantSummary, RestaurantSummaryJson, RestaurantSummarySerializable } from "./RestaurantSummary";

export class RestaurantSummaryList {
    readonly total: number;
    readonly restaurantSummaries: RestaurantSummary[];
    constructor(total: number, restaurantSummaries: RestaurantSummary[]) {
        this.total = total;
        this.restaurantSummaries = restaurantSummaries;
        Object.freeze(this);
    }

    toSerializable(): RestaurantSummaryListSerializable {
        return {
            total: this.total,
            restaurantSummaries: this.restaurantSummaries.map(restaurantSummary => restaurantSummary.toSerializable())
        };
    }

    static fromJson(json: RestaurantSummaryListJson): RestaurantSummaryList {
        const restaurantSummaries = json.search.business.map((restaurantSummaryJson) => {
            try {
                return RestaurantSummary.fromJson(restaurantSummaryJson);
            } catch (_) {
                return null;
            }
        }).filter((restaurantSummary): restaurantSummary is RestaurantSummary => restaurantSummary !== null);

        const total = json.search.total;

        return new RestaurantSummaryList(total, restaurantSummaries);
    }
}

export interface RestaurantSummaryListSerializable {
    total: number;
    restaurantSummaries: RestaurantSummarySerializable[];
}

export interface RestaurantSummaryListJson {
    search: {
        total: number;
        business: RestaurantSummaryJson[];
    };
}