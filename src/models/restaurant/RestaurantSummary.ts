import { RestaurantId } from "@models";
import Category from "./Category";

export default interface RestaurantSummary {
    id: RestaurantId;
    name: string | null;
    price: string | null;
    rating: number | null;
    photos: string[];
    categories: Category[];
    isOpenNow: boolean | null;
}

