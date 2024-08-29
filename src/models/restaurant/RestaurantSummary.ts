import { RestaurantId } from "@models";

export default interface RestaurantSummary {
    id: RestaurantId;
    name: string | null;
    price: string | null;
    rating: number | null;
    photos: string[];
    categories: { title: string | null }[];
    is_open_now: boolean | null;
}
