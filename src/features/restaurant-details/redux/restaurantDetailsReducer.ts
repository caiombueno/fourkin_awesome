import { RestaurantDetails } from "@models";
import { createSlice } from "@reduxjs/toolkit";
import { getRestaurantDetails } from "./getRestaurantDetails";

const initialState = {
    loading: false,
    data: null as RestaurantDetails | null,
    error: null as Error | null,
}

const restaurantDetailsSlice = createSlice({
    name: 'restaurant-details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurantDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRestaurantDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getRestaurantDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error as Error;
            });
    },
});

export const restaurantDetailsReducer = restaurantDetailsSlice.reducer;