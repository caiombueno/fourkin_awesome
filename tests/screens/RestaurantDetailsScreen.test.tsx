import React from 'react';
import { render } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { RestaurantDetailsScreen } from '@features';
import { componentsTestIds, mockRootState } from '../utils';
import { RestaurantDetailsSerializable } from '@models';

const mockStore = configureStore([]);

jest.mock('../../src/features/restaurant-details/redux/getRestaurantDetails', () => ({
    getRestaurantDetails: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => 'Ionicons');

describe('RestaurantDetailsScreen', () => {

    const restaurantDetailsScreenTestIds = componentsTestIds.RestaurantDetailsScreen;

    const renderRestaurantDetailsScreenWithProvider = (store: any, restaurantId: string, restaurantImageUrl?: string) => render(
        <Provider store={store}>
            <RestaurantDetailsScreen restaurantId={restaurantId} restaurantImageUrl={restaurantImageUrl} />
        </Provider>
    );

    const mockStoreWithState = (state: any) => {
        const store = mockStore(state);
        store.dispatch = jest.fn();
        return store;
    };

    it('should render RestaurantDetailsView when data is available', () => {

        const data: RestaurantDetailsSerializable = {
            id: '1',
            name: 'Restaurant 1',
            price: "$$",
            rating: 4,
            categories: [{ title: 'Italian' }],
            isOpenNow: true,
            reviews: [],
            address: '123 Main St',
        }
        // Arrange
        const modifiedState = {
            ...mockRootState,
            restaurantDetails: {
                data: data,
                loading: false,
                error: null,
            },
        };

        const store = mockStoreWithState(modifiedState);

        // Act
        const { getByTestId } = renderRestaurantDetailsScreenWithProvider(store, '1', 'https://example.com/image.jpg');

        // Assert
        expect(getByTestId(restaurantDetailsScreenTestIds.RestaurantDetailsView)).toBeTruthy();
    });

    it('should render LoadingIndicator when loading is true', () => {
        // Arrange
        const modifiedState = {
            ...mockRootState,
            restaurantDetails: {
                ...mockRootState.restaurantDetails,
                loading: true,
                data: null,
                error: null,
            },
        };

        const store = mockStoreWithState(modifiedState);

        // Act
        const { getByTestId } = renderRestaurantDetailsScreenWithProvider(store, '1');

        // Assert
        expect(getByTestId(restaurantDetailsScreenTestIds.LoadingIndicator)).toBeTruthy();
    });

    it('should render ErrorIndicator when an error occurs', () => {
        // Arrange
        const modifiedState = {
            ...mockRootState,
            restaurantDetails: {
                ...mockRootState.restaurantDetails,
                loading: false,
                data: null,
                error: { message: 'Network error' },
            },
        };
        const store = mockStoreWithState(modifiedState);

        // Act
        const { getByTestId, getByText } = renderRestaurantDetailsScreenWithProvider(store, '1');

        // Assert
        expect(getByTestId(restaurantDetailsScreenTestIds.ErrorIndicator)).toBeTruthy();
        expect(getByText('Network error'));
    });

    it('should dispatch getRestaurantDetails when mounted', () => {
        // Arrange
        const store = mockStoreWithState(mockRootState);

        // Act
        renderRestaurantDetailsScreenWithProvider(store, '1');

        // Assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
