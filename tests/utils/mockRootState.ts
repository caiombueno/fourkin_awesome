import { RestaurantDetailsSerializable } from "@models";

export const mockRootState = {
    "restaurantDetails": {
        "data": null as RestaurantDetailsSerializable | null,
        "error": null,
        "loading": false
    },
    "restaurantSummaryList": {
        "data": [],
        "error": null,
        "hasMore": true,
        "loading": false,
        "offset": 0
    },
    "restaurantSummaryListSearchInput": {
        "location": "San Francisco, California, USA",
    },
    "auth": {
        "user": null,
        "error": null,
        "loading": false
    },
}