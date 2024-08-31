import { RestaurantSummary } from "@models";

export default interface RestaurantSummaryListState {
    loading: boolean;
    data: RestaurantSummary[];
    error: string | null;
}
