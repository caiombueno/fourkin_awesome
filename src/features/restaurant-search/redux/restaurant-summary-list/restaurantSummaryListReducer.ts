import { createSlice, Reducer } from '@reduxjs/toolkit';
import getRestaurantSummaryList from './getRestaurantSummaryList';
import RestaurantSummaryListState from './RestaurantSummaryListState';


const initialState: RestaurantSummaryListState = {
    loading: false,
    data: [],
    error: null,
};


const restaurantSummaryListSlice = createSlice({
    name: 'restaurantSummaryList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurantSummaryList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRestaurantSummaryList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
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
