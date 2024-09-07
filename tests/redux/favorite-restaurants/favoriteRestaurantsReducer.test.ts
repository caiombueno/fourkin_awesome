import { addFavoriteRestaurant, removeFavoriteRestaurant, getFavoriteRestaurants, favoriteRestaurantsReducer, FavoriteRestaurantsState } from '@features';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

jest.mock('../../../src/data', () => ({
    favoriteRestaurantsManager: {
        addFavoriteRestaurantId: jest.fn(),
        removeFavoriteRestaurantId: jest.fn(),
        getFavoriteRestaurantsIds: jest.fn(),
    },
}));

const mockRestaurantSummaryList = {
    total: 2,
    restaurantSummaries: [
        { id: 'restaurant1', name: 'Restaurant 1' },
        { id: 'restaurant2', name: 'Restaurant 2' },
    ],
};

const mockStore = configureMockStore([thunk as any]);
let store: ReturnType<typeof mockStore>;

const initialState: FavoriteRestaurantsState = {
    favoriteRestaurantSummaryList: null,
    loading: false,
    error: null,
};

describe('favoriteRestaurantReducer', () => {
    beforeEach(() => {
        store = mockStore({});
    });

    describe('addFavoriteRestaurant', () => {
        it('should set loading to true when addFavoriteRestaurant.pending is dispatched', () => {
            const action = { type: addFavoriteRestaurant.pending.type };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: true,
                error: null,
            });
        });

        it('should handle successful addFavoriteRestaurant.fulfilled', async () => {
            const action = { type: addFavoriteRestaurant.fulfilled.type };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                error: null,
            });
        });

        it('should handle addFavoriteRestaurant.rejected and set an error', () => {
            const action = { type: addFavoriteRestaurant.rejected.type, payload: 'Error adding favorite restaurant' };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                error: 'Error adding favorite restaurant',
            });
        });
    });

    describe('removeFavoriteRestaurant', () => {
        it('should set loading to true when removeFavoriteRestaurant.pending is dispatched', () => {
            const action = { type: removeFavoriteRestaurant.pending.type };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: true,
                error: null,
            });
        });

        it('should handle successful removeFavoriteRestaurant.fulfilled', async () => {
            const action = { type: removeFavoriteRestaurant.fulfilled.type };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                error: null,
            });
        });

        it('should handle removeFavoriteRestaurant.rejected and set an error', () => {
            const action = { type: removeFavoriteRestaurant.rejected.type, payload: 'Error removing favorite restaurant' };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                error: 'Error removing favorite restaurant',
            });
        });
    });

    describe('getFavoriteRestaurants', () => {
        it('should set loading to true when getFavoriteRestaurants.pending is dispatched', () => {
            const action = { type: getFavoriteRestaurants.pending.type };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: true,
                error: null,
            });
        });

        it('should handle successful getFavoriteRestaurants.fulfilled', async () => {
            const action = { type: getFavoriteRestaurants.fulfilled.type, payload: mockRestaurantSummaryList };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                favoriteRestaurantSummaryList: mockRestaurantSummaryList,
                error: null,
            });
        });

        it('should handle getFavoriteRestaurants.rejected and set an error', () => {
            const action = { type: getFavoriteRestaurants.rejected.type, payload: 'Failed to fetch favorite restaurants' };
            const state = favoriteRestaurantsReducer(initialState, action);

            expect(state).toEqual({
                ...initialState,
                loading: false,
                error: 'Failed to fetch favorite restaurants',
            });
        });
    });
});