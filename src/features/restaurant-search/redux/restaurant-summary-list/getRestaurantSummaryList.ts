import { restaurantRepository } from "@data";
import { RestaurantSummaryListSerializable } from "@models";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getRestaurantSummaryList = createAsyncThunk(
    'restaurants/getRestaurantSummaryList',
    async ({ location, offset, limit }: { location: string, offset: number, limit: number }): Promise<{ data: RestaurantSummaryListSerializable, offset: number }> => {
        try {
            const restaurantSummaryList = await restaurantRepository.getRestaurantSummaryList({ location, limit, offset });
            const serializedRestaurantSummaryList = restaurantSummaryList.toSerializable();

            return { data: serializedRestaurantSummaryList, offset };
        } catch (error) {
            throw error;
        }
    }
);


export default getRestaurantSummaryList;