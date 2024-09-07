import { restaurantRepository } from "@data";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRestaurantDetails = createAsyncThunk(
    'restaurant-details/getRestaurantDetails',
    async ({ id }: { id: string }) => {
        try {
            const restaurantDetails = await restaurantRepository.getRestaurantDetails({ id });

            // Redux requires the data to be serializable for safe storage.
            const serializableRestaurantDetails = restaurantDetails.toSerializable();

            return serializableRestaurantDetails;
        } catch (error) {
            throw error;
        }
    }
);
