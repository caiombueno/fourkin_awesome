import { configureStore } from '@reduxjs/toolkit';
import { authReducer, currentUserReducer, favoriteRestaurantsReducer, restaurantSummaryListReducer, restaurantSummaryListSearchInputReducer } from '@features';
import { restaurantDetailsReducer } from 'features/restaurant-details/redux/restaurantDetailsReducer';

const store = configureStore({
    reducer: {
        restaurantSummaryList: restaurantSummaryListReducer,
        restaurantSummaryListSearchInput: restaurantSummaryListSearchInputReducer,
        restaurantDetails: restaurantDetailsReducer,
        auth: authReducer,
        currentUser: currentUserReducer,
        favoriteRestaurants: favoriteRestaurantsReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>

