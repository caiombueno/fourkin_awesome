import { restaurantRepository } from "@data";
import { RestaurantSummary } from "@models";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getRestaurantSummaryList = createAsyncThunk(
    'restaurants/getRestaurantSummaryList',
    async ({ location, offset, limit }: { location: string, offset: number, limit: number }): Promise<RestaurantSummary[]> => {
        try {
            const response = await restaurantRepository.getRestaurantSummaryList({ location, limit, offset });
            return response;
        } catch (error) {
            if (error instanceof Error)
                console.log(error.message);
            throw error;
        }
    }
);

export default getRestaurantSummaryList;