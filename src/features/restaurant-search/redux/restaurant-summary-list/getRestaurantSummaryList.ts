import { restaurantRepository } from "@data";
import { RestaurantSummary, RestaurantSummarySerializable } from "@models";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getRestaurantSummaryList = createAsyncThunk(
    'restaurants/getRestaurantSummaryList',
    async ({ location, offset, limit }: { location: string, offset: number, limit: number }): Promise<RestaurantSummarySerializable[]> => {
        try {
            const restaurantSummaryList = await restaurantRepository.getRestaurantSummaryList({ location, limit, offset });

            const serializedRestaurantSummaryList = restaurantSummaryList.toSerializable();

            return serializedRestaurantSummaryList;
        } catch (error) {
            if (error instanceof Error)
                console.log(error.message);
            throw error;
        }
    }
);

export default getRestaurantSummaryList;