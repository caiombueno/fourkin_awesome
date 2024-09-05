import React from 'react';
import { render } from '@testing-library/react-native';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { FavoriteRestaurantsScreen, getFavoriteRestaurants } from '@features';

jest.mock('../../src/components', () => ({
    RestaurantCard: jest.fn().mockReturnValue(null), // Mock the RestaurantCard
}));

jest.mock('../../src/features/favorite-restaurants/redux', () => ({
    getFavoriteRestaurants: jest.fn(),
}));

const mockStore = configureMockStore([thunk as any]);

describe('FavoriteRestaurantsScreen', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        (getFavoriteRestaurants as unknown as jest.Mock).mockReturnValue(() => (dispatch: any) => { });
        store = mockStore({
            favoriteRestaurants: {
                favoriteRestaurantSummaryList: null,
                loading: false,
                error: null,
            },
        });
        store.dispatch = jest.fn();
    });

    it('should dispatch getFavoriteRestaurants on mount', () => {
        // Arrange
        const { dispatch } = store;

        // Act
        render(
            <Provider store={store}>
                <FavoriteRestaurantsScreen />
            </Provider>
        );

        // Assert
        expect(dispatch).toHaveBeenCalledWith(getFavoriteRestaurants());
    });

    it('should show loading indicator when loading is true', () => {
        // Arrange
        store = mockStore({
            favoriteRestaurants: { favoriteRestaurantSummaryList: null, loading: true, error: null },
        });

        // Act
        const { getByTestId } = render(
            <Provider store={store}>
                <FavoriteRestaurantsScreen />
            </Provider>
        );

        // Assert
        expect(getByTestId('loadingIndicator')).toBeTruthy();
    });

    it('should show error message when error exists', () => {
        // Arrange
        store = mockStore({
            favoriteRestaurants: { favoriteRestaurantSummaryList: null, loading: false, error: 'Something went wrong' },
        });

        // Act
        const { getByTestId } = render(
            <Provider store={store}>
                <FavoriteRestaurantsScreen />
            </Provider>
        );

        // Assert
        expect(getByTestId('errorMessage').props.children).toEqual('Something went wrong');
    });

    it('should show empty indicator when there are no favorite restaurants', () => {
        // Arrange
        store = mockStore({
            favoriteRestaurants: {
                favoriteRestaurantSummaryList: { total: 0, restaurantSummaries: [] },
                loading: false,
                error: null,
            },
        });

        // Act
        const { getByTestId } = render(
            <Provider store={store}>
                <FavoriteRestaurantsScreen />
            </Provider>
        );

        // Assert
        expect(getByTestId('emptyIndicator')).toBeTruthy();
    });

    it('should render a list of restaurant cards when favorite restaurants exist', () => {
        // Arrange
        const mockRestaurantSummaries = [
            { id: 'restaurant1', name: 'Restaurant 1' },
            { id: 'restaurant2', name: 'Restaurant 2' },
        ];

        store = mockStore({
            favoriteRestaurants: {
                favoriteRestaurantSummaryList: { total: 2, restaurantSummaries: mockRestaurantSummaries },
                loading: false,
                error: null,
            },
        });

        // Act
        const { getByTestId } = render(
            <Provider store={store}>
                <FavoriteRestaurantsScreen />
            </Provider>
        );

        // Assert
        expect(getByTestId('restaurantCardList')).toBeTruthy();
    });
});