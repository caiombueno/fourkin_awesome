import RestaurantSummary from "@models/RestaurantSummary";

export default interface RestaurantSummaryListState {
    loading: boolean;
    data: RestaurantSummary[];
    error: string | null;
}
