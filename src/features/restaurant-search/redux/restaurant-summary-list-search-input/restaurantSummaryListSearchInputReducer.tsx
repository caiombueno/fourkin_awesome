import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantSummaryListSearchInputState {
    location: string;
    name: string;
}

const initialState: RestaurantSummaryListSearchInputState = {
    location: '',
    name: '',
};

const restaurantSummaryListSearchInputSlice = createSlice({
    name: 'restaurantSummaryListSearchInputSlice',
    initialState,
    reducers: {
        setLocationInput: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        setNameInput: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
});

export const { setLocationInput, setNameInput } = restaurantSummaryListSearchInputSlice.actions;

const restaurantSummaryListSearchInputReducer = restaurantSummaryListSearchInputSlice.reducer;

export default restaurantSummaryListSearchInputReducer;
