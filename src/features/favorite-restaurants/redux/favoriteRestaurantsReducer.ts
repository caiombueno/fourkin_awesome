import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { favoriteRestaurantsManager } from '@data';
import { RestaurantId, RestaurantSummaryListSerializable } from '@models';

interface FavoriteRestaurantsState {
    favoriteRestaurantSummaryList: RestaurantSummaryListSerializable | null;
    loading: boolean;
    error: string | null;
}

const initialState: FavoriteRestaurantsState = {
    favoriteRestaurantSummaryList: null,
    loading: false,
    error: null,
};

const addFavoriteRestaurant = createAsyncThunk<void, RestaurantId, { rejectValue: string }>(
    'favorites/addFavoriteRestaurant',
    async (restaurantId, { rejectWithValue }) => {
        try {
            await favoriteRestaurantsManager.addFavoriteRestaurantId({ restaurantId });
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to add favorite restaurant');
        }
    }
);

const removeFavoriteRestaurant = createAsyncThunk<void, RestaurantId, { rejectValue: string }>(
    'favorites/removeFavoriteRestaurant',
    async (restaurantId, { rejectWithValue }) => {
        try {
            await favoriteRestaurantsManager.removeFavoriteRestaurantId({ restaurantId });
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to remove favorite restaurant');
        }
    }
);

const getFavoriteRestaurants = createAsyncThunk<RestaurantSummaryListSerializable, void, { rejectValue: string }>(
    'favorites/getFavoriteRestaurants',
    async (_, { rejectWithValue }) => {
        try {
            const favorites = await favoriteRestaurantsManager.getFavoriteRestaurantsIds();
            return favorites.toSerializable();
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to fetch favorite restaurants');
        }
    }
);

// Slice for managing favorite restaurants
const favoriteRestaurantsSlice = createSlice({
    name: 'favoriteRestaurants',
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.favoriteRestaurantSummaryList = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Add favorite restaurant
        builder.addCase(addFavoriteRestaurant.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addFavoriteRestaurant.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(addFavoriteRestaurant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? 'Failed to add favorite restaurant';
        });

        // Remove favorite restaurant
        builder.addCase(removeFavoriteRestaurant.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(removeFavoriteRestaurant.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(removeFavoriteRestaurant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? 'Failed to remove favorite restaurant';
        });

        // Fetch favorite restaurants
        builder.addCase(getFavoriteRestaurants.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getFavoriteRestaurants.fulfilled, (state, action: PayloadAction<RestaurantSummaryListSerializable>) => {
            state.loading = false;
            state.favoriteRestaurantSummaryList = action.payload;
            state.error = null;
        });
        builder.addCase(getFavoriteRestaurants.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? 'Failed to fetch favorite restaurants';
        });
    },
});

const favoriteRestaurantsReducer = favoriteRestaurantsSlice.reducer;

export { getFavoriteRestaurants, addFavoriteRestaurant, removeFavoriteRestaurant, favoriteRestaurantsReducer, FavoriteRestaurantsState };