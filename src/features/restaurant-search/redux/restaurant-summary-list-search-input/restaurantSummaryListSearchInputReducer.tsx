import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantSummaryListSearchInputState {
    location: string;
}

const initialState: RestaurantSummaryListSearchInputState = {
    location: '',
};

const restaurantSummaryListSearchInputSlice = createSlice({
    name: 'restaurantSummaryListSearchInputSlice',
    initialState,
    reducers: {
        setLocationInput: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
    },
});

export const { setLocationInput } = restaurantSummaryListSearchInputSlice.actions;

const restaurantSummaryListSearchInputReducer = restaurantSummaryListSearchInputSlice.reducer;

export default restaurantSummaryListSearchInputReducer;
