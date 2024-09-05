
import { getRestaurantDetails, restaurantDetailsReducer } from '@features';
import { RestaurantDetailsSerializable } from '@models';


describe('restaurantDetailsReducer', () => {
    const initialState = {
        loading: false,
        data: null,
        error: null,
    };

    it('should return the initial state', () => {
        // Arrange
        const action = { type: 'unknown' };

        // Act
        const state = restaurantDetailsReducer(undefined, action);

        // Assert
        expect(state).toEqual(initialState);
    });

    it('should handle getRestaurantDetails.pending', () => {
        // Arrange
        const action = { type: getRestaurantDetails.pending.type };

        // Act
        const state = restaurantDetailsReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    it('should handle getRestaurantDetails.fulfilled', () => {
        // Arrange
        const restaurantDetails: RestaurantDetailsSerializable = {
            id: '1',
            name: 'Restaurant 1',
            address: '123 Main St',
            rating: 4.5,
            price: '$$$',
            categories: [{ title: 'Category 1' }],
            isOpenNow: true,
            reviews: [],
        };
        const action = {
            type: getRestaurantDetails.fulfilled.type,
            payload: restaurantDetails,
        };

        // Act
        const state = restaurantDetailsReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            data: restaurantDetails,
            loading: false,
        });
    });

    it('should handle getRestaurantDetails.rejected', () => {
        // Arrange
        const action = {
            type: getRestaurantDetails.rejected.type,
            error: { message: 'Network Error' } as Error,
        };

        // Act
        const state = restaurantDetailsReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: { message: 'Network Error' },
        });
    });
});
