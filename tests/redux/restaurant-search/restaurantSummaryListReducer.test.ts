import { getRestaurantSummaryList, resetRestaurantSummaryList, restaurantSummaryListReducer, RestaurantSummaryListState } from "@features";
import { Category } from "@models";

describe('restaurantSummaryListReducer', () => {
    const initialState: RestaurantSummaryListState = {
        loading: false,
        data: [],
        error: null,
        offset: 0,
        hasMore: true,
    };

    it('should return the initial state', () => {
        // Arrange
        const action = { type: 'unknown' };

        // Act
        const state = restaurantSummaryListReducer(undefined, action);

        // Assert
        expect(state).toEqual(initialState);
    });

    it('should handle getRestaurantSummaryList.pending', () => {
        // Arrange
        const action = { type: getRestaurantSummaryList.pending.type };

        // Act
        const state = restaurantSummaryListReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    it('should handle getRestaurantSummaryList.fulfilled', () => {
        // Arrange
        const restaurantSummaries = [
            { id: 1, name: 'Restaurant 1' },
            { id: 2, name: 'Restaurant 2' },
        ];
        const action = {
            type: getRestaurantSummaryList.fulfilled.type,
            payload: {
                data: { restaurantSummaries, total: 10 },
                offset: 0,
            },
        };

        // Act
        const state = restaurantSummaryListReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            data: restaurantSummaries,
            loading: false,
            offset: 0,
            hasMore: true,
        });
    });

    it('should handle getRestaurantSummaryList.fulfilled with end of data', () => {
        // Arrange
        const restaurantSummaries = [
            { id: 1, name: 'Restaurant 1' },
            { id: 2, name: 'Restaurant 2' },
        ];
        const action = {
            type: getRestaurantSummaryList.fulfilled.type,
            payload: {
                data: { restaurantSummaries, total: 2 },
                offset: 2,
            },
        };

        // Act
        const state = restaurantSummaryListReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            data: restaurantSummaries,
            loading: false,
            offset: 2,
            hasMore: false, // No more data to load since total == data length
        });
    });

    it('should handle getRestaurantSummaryList.rejected', () => {
        // Arrange
        const action = {
            type: getRestaurantSummaryList.rejected.type,
            error: { message: 'Network Error' },
        };

        // Act
        const state = restaurantSummaryListReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: 'Network Error',
        });
    });

    it('should handle resetRestaurantSummaryList', () => {
        // Arrange
        const action = resetRestaurantSummaryList();
        const modifiedState: RestaurantSummaryListState = {
            loading: false,
            data: [{ id: '1', name: 'Restaurant 1', photos: [] as string[], categories: [] as Category[], rating: 4, price: '$$', isOpenNow: true }],
            error: null,
            offset: 10,
            hasMore: false,
        };

        // Act
        const state = restaurantSummaryListReducer(modifiedState, action);

        // Assert
        expect(state).toEqual(initialState);
    });
});