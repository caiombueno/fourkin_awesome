import { DataFormatFailureError } from "../errors";
import Category from "./Category";
import RestaurantId from "./RestaurantId";
import Review, { ReviewJson } from "./Review";

export interface RestaurantDetailsJson {
    business: {
        id: string;
        name: string | null;
        price: string | null;
        rating: number | null;
        photos: string[] | null;
        categories: {
            title: string | null;
            alias: string | null;
        }[] | null;
        hours: { is_open_now: boolean | null }[] | null;
        reviews: ReviewJson[] | null;
        location: { formatted_address: string | null } | null;
    }
}

class RestaurantDetails {
    readonly id: RestaurantId;
    readonly name: string | null;
    readonly price: string | null;
    readonly rating: number | null;
    readonly categories: Category[];
    readonly isOpenNow: boolean | null;
    readonly reviews: Review[];
    readonly address: string | null;

    constructor(
        {
            id,
            name,
            price,
            rating,
            categories,
            isOpenNow,
            reviews,
            address,
        }: {
            id: RestaurantId,
            name: string | null;
            price: string | null;
            rating: number | null;
            categories: Category[];
            isOpenNow: boolean | null;
            reviews: Review[];
            address: string | null;
        }

    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.categories = categories;
        this.isOpenNow = isOpenNow;
        this.reviews = reviews;
        this.address = address;

        Object.freeze(this);
    }

    static fromJson(json: RestaurantDetailsJson): RestaurantDetails {
        try {
            const {
                id,
                name,
                price,
                rating,
                categories,
                hours,
                reviews,
                location
            } = json.business;

            if (!id) throw new DataFormatFailureError();

            const isOpenNow = (hours && hours[0]?.is_open_now) ?? false;

            const parsedReviews = reviews?.map(Review.fromJson) ?? [];

            const restaurantDetails: RestaurantDetails = new RestaurantDetails({
                id,
                name,
                price,
                rating,
                categories: categories?.map(({ title }) => ({ title })) ?? [],
                isOpenNow: isOpenNow,
                reviews: parsedReviews,
                address: location?.formatted_address ?? null,
            });

            return restaurantDetails;
        } catch (_) {
            throw new DataFormatFailureError();
        }
    }
}

export default RestaurantDetails;