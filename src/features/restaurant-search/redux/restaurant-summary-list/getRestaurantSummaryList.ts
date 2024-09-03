import { restaurantRepository } from "@data";
import { RestaurantSummaryListSerializable, RestaurantSummarySerializable } from "@models";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getRestaurantSummaryList = createAsyncThunk(
    'restaurants/getRestaurantSummaryList',
    async ({ location, offset, limit }: { location: string, offset: number, limit: number }): Promise<{ data: RestaurantSummaryListSerializable, offset: number }> => {
        try {
            const restaurantSummaryList = await restaurantRepository.getRestaurantSummaryList({ location, limit, offset });
            console.log(restaurantSummaryList);
            const serializedRestaurantSummaryList = restaurantSummaryList.toSerializable();

            return { data: serializedRestaurantSummaryList, offset };
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            throw error;
        }
    }
);


export default getRestaurantSummaryList;