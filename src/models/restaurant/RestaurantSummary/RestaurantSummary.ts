import { DataFormatFailureError } from "../../errors";
import Category from "../Category";
import RestaurantId from "../RestaurantId";

export class RestaurantSummary {
    readonly id: RestaurantId;
    readonly name: string | null;
    readonly price: string | null;
    readonly rating: number | null;
    readonly photos: string[];
    readonly categories: Category[];
    readonly isOpenNow: boolean | null;

    constructor(
        {
            id,
            name,
            price,
            rating,
            photos,
            categories,
            isOpenNow,
        }: {
            id: RestaurantId,
            name: string | null;
            price: string | null;
            rating: number | null;
            photos: string[];
            categories: Category[];
            isOpenNow: boolean | null;
        }

    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.photos = photos;
        this.categories = categories;
        this.isOpenNow = isOpenNow;

        Object.freeze(this);
    }

    toSerializable(): RestaurantSummarySerializable {
        return {
            id: this.id.toString(),
            name: this.name,
            price: this.price,
            rating: this.rating,
            photos: this.photos,
            categories: this.categories.map(category => ({ title: category.title })),
            isOpenNow: this.isOpenNow,
        };
    }

    static fromJson(json: RestaurantSummaryJson): RestaurantSummary {
        const { id, name, price, rating, photos, categories, hours } = json;

        if (!id) throw new DataFormatFailureError();

        const isOpenNow = (hours && hours[0]?.is_open_now) ?? false;

        const restaurantSummary = new RestaurantSummary({
            id,
            name,
            price,
            rating,
            photos: photos ?? [],
            categories: categories?.map(({ title }) => ({ title })) ?? [],
            isOpenNow: isOpenNow,
        });

        return restaurantSummary;
    }
}


export interface RestaurantSummaryJson {
    id: RestaurantId;
    name: string | null;
    price: string | null;
    rating: number | null;
    photos: string[];
    categories: {
        title: string | null;
        alias: string | null;
    }[] | null;
    hours: { is_open_now: boolean | null }[] | null;
}

export interface RestaurantSummarySerializable {
    id: string;
    name: string | null;
    price: string | null;
    rating: number | null;
    photos: string[];
    categories: Category[];
    isOpenNow: boolean | null;
}

