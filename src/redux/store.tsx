import { configureStore } from '@reduxjs/toolkit';
import { restaurantSummaryListReducer, restaurantSummaryListSearchInputReducer } from '@features';
import { restaurantDetailsReducer } from 'features/restaurant-details/redux/restaurantDetailsReducer';


const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
    // console.log('Dispatching:', action);
    let result = next(action);
    // console.log('Next state:', store.getState());
    return result;
};

const store = configureStore({
    reducer: {
        restaurantSummaryList: restaurantSummaryListReducer,
        restaurantSummaryListSearchInput: restaurantSummaryListSearchInputReducer,
        restaurantDetails: restaurantDetailsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>

