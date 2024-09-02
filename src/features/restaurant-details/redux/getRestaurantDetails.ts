import { restaurantRepository } from "@data";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRestaurantDetails = createAsyncThunk(
    'restaurant-details/getRestaurantDetails',
    async ({ id }: { id: string }) => {
        try {
            const response = await restaurantRepository.getRestaurantDetails({ id });

            return response;
        } catch (error) {
            throw error;
        }
    }
);
