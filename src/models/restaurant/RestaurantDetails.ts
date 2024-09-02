import Category from "./Category";
import RestaurantId from "./RestaurantId";
import Review from "./Review";

interface RestaurantDetails {
    id: RestaurantId,
    name: string | null;
    price: string | null;
    rating: number | null;
    categories: Category[];
    isOpenNow: boolean | null;
    reviews: Review[];
    address: string | null;
}

export default RestaurantDetails;