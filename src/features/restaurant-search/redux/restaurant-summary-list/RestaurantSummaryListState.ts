import { RestaurantSummarySerializable } from "@models";

export default interface RestaurantSummaryListState {
    loading: boolean;
    data: RestaurantSummarySerializable[];
    error: string | null;
    offset: number;
    hasMore: boolean;
}
