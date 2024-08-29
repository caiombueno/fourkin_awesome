import { DataFormatFailureError } from "@models/errors/DataSourceError";
import RestaurantSummary, { RestaurantId } from "@models/RestaurantSummary";

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
                is_open_now: isOpenNow,
            };

            return restaurantSummary;
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
