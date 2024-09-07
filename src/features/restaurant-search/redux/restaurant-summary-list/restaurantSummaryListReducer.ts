import { createSlice, Reducer } from '@reduxjs/toolkit';
import getRestaurantSummaryList from './getRestaurantSummaryList';
import RestaurantSummaryListState from './RestaurantSummaryListState';


const initialState: RestaurantSummaryListState = {
    loading: false,
    data: [],
    error: null,
    offset: 0,
    hasMore: true,
};

const restaurantSummaryListSlice = createSlice({
    name: 'restaurantSummaryList',
    initialState,
    reducers: {
        resetRestaurantSummaryList: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurantSummaryList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRestaurantSummaryList.fulfilled, (state, action) => {
                state.loading = false;
                // Append new data to existing data

                const restaurantSummaryList = action.payload.data;
                state.data = [...state.data, ...restaurantSummaryList.restaurantSummaries];
                state.offset = action.payload.offset;
                // If the returned data length is less than the limit, it means there's no more data to load
                // state.hasMore = action.payload.data.length === action.payload.offset;
                state.hasMore = state.data.length < restaurantSummaryList.total;
            })
            .addCase(getRestaurantSummaryList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch restaurants';
            });
    },
});



const restaurantSummaryListReducer: Reducer<RestaurantSummaryListState>
    = restaurantSummaryListSlice.reducer;

export default restaurantSummaryListReducer;

export const { resetRestaurantSummaryList } = restaurantSummaryListSlice.actions;