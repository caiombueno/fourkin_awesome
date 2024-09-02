import { RestaurantSummary, RestaurantId, DataFormatFailureError, RestaurantDetails, ReviewUser, Review } from "@models";

export default class RestaurantDataSourceParser {
    public static parseRestaurantSummaryList = (rawData: RestaurantSummaryRawData[]): RestaurantSummary[] => {
        const restaurantSummaries: RestaurantSummary[] = rawData.map((business: RestaurantSummaryRawData) => {
            try {
                return this.parseRestaurantSummary(business);
            } catch (error) {
                // Return null or skip this item if an error occurs
                return null;
            }
        }).filter((summary): summary is RestaurantSummary => summary !== null);

        return restaurantSummaries;
    }

    private static parseRestaurantSummary = (rawData: RestaurantSummaryRawData) => {
        try {
            const { id, name, price, rating, photos, categories, hours } = rawData;

            if (!id) throw new DataFormatFailureError();

            const isOpenNow = (hours && hours[0]?.is_open_now) ?? false;

            const restaurantSummary: RestaurantSummary = {
                id,
                name,
                price,
                rating,
                photos: photos ?? [],
                categories: categories?.map(({ title }) => ({ title })) ?? [],
                isOpenNow: isOpenNow,
            };

            return restaurantSummary;
        } catch (_) {
            throw new DataFormatFailureError();
        }
    };

    private static parseReview = (rawData: ReviewRawData) => {

        const rawUser = rawData.user;

        const rawUserId = rawUser.id;

        if (!rawUserId) throw new DataFormatFailureError();

        const reviewUser: ReviewUser = {
            id: rawUserId,
            imageUrl: rawUser.image_url,
            name: rawUser.name,
        };

        const reviewId = rawData.id;

        if (!reviewId) throw new DataFormatFailureError();

        const review: Review = {
            id: reviewId,
            rating: rawData.rating,
            text: rawData.text,
            user: reviewUser,
        };
        return review;
    }

    private static parseReviews = (rawData: ReviewRawData[]) => {
        const parsedReviews = rawData?.map((rawReview) => {
            try {
                return this.parseReview(rawReview);
            } catch (error) {
                return null;
            }
        }).filter((review): review is Review => review !== null) ?? [];

        return parsedReviews;
    };


    public static parseRestaurantDetails = (rawData: RestaurantDetailsRawData) => {
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
            } = rawData.business;

            if (!id) throw new DataFormatFailureError();

            const isOpenNow = (hours && hours[0]?.is_open_now) ?? false;

            const parsedReviews = this.parseReviews(reviews ?? []);

            const restaurantDetails: RestaurantDetails = {
                id,
                name,
                price,
                rating,
                categories: categories?.map(({ title }) => ({ title })) ?? [],
                isOpenNow: isOpenNow,
                reviews: parsedReviews,
                address: location?.formatted_address ?? null,
            };

            return restaurantDetails;
        } catch (_) {
            throw new DataFormatFailureError();
        }
    };
}

interface CategoryRawData {
    title: string | null;
    alias: string | null;
}

export interface RestaurantSummaryRawData {
    id: RestaurantId;
    name: string | null;
    price: string | null;
    rating: number | null;
    photos: string[] | null;
    categories: CategoryRawData[] | null;
    hours: { is_open_now: boolean | null }[] | null;
}

interface ReviewRawData {
    id: string;
    rating: number;
    text: string;
    user: {
        id: string;
        name: string | null;
        image_url: string | null;
    }
}

export interface RestaurantDetailsRawData {
    business: {
        id: string;
        name: string | null;
        price: string | null;
        rating: number | null;
        photos: string[] | null;
        categories: CategoryRawData[] | null;
        hours: { is_open_now: boolean | null }[] | null;
        reviews: ReviewRawData[] | null;
        location: { formatted_address: string | null } | null;
    }
}