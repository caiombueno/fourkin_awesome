import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import RestaurantCardListView from '../../src/features/restaurant-search/components/RestaurantCardListView/RestaurantCardListView';
import { componentsTestIds, mockRootState } from '../utils';
import { Category, RestaurantSummarySerializable } from '@models';
import { thunk } from 'redux-thunk';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));


jest.mock('@features/restaurant-search/redux', () => ({
    getRestaurantSummaryList: jest.fn(),
    resetRestaurantSummaryList: jest.fn(),
    selectRestaurantSummaryList: jest.fn(),
}));

const mockStore = configureMockStore([thunk as any]);

describe('RestaurantCardListView', () => {

    const restaurantCardListViewTestIds = componentsTestIds.RestaurantCardListView;

    const renderWithProvider = (store: any, location = 'Los Angeles') =>
        render(
            <Provider store={store}>
                <RestaurantCardListView location={location} />
            </Provider>
        );

    const mockStoreWithState = (state: any) => {
        const store = mockStore(state);
        store.dispatch = jest.fn();

        return store;
    };

    beforeAll(() => {
        (useNavigation as jest.Mock).mockReturnValue({
            navigate: jest.fn(),
        });
    });

    const modifiedStateWithData = {
        ...mockRootState,
        restaurantSummaryList: {
            ...mockRootState.restaurantSummaryList,
            data: [
                { id: '1', name: 'Restaurant 1', photos: [] as string[], categories: [] as Category[] } as RestaurantSummarySerializable,
                { id: '2', name: 'Restaurant 2', photos: [] as string[], categories: [] as Category[] },
            ],
            loading: false,
            error: null,
            hasMore: true,
            offset: 0,
        },
    };

    const expectDispatchHaveBeenCalled = (store: any, times: number) => {
        expect(store.dispatch).toHaveBeenCalledTimes(times);
    };

    const expectDispatchHaveBeenCalledOnce = (store: any) => {
        expectDispatchHaveBeenCalled(store, 1);
    }

    it('should render FlatList when data is available', () => {
        // Arrange
        const store = mockStoreWithState(modifiedStateWithData);

        // Act
        const { getByTestId } = renderWithProvider(store);

        // Assert
        expect(getByTestId(restaurantCardListViewTestIds.FlatList)).toBeTruthy();
        expectDispatchHaveBeenCalledOnce(store);
    });

    it('should render LoadingIndicator when loading is true and no data is available', () => {
        // Arrange
        const modifiedState = {
            ...mockRootState,
            restaurantSummaryList: {
                ...mockRootState.restaurantSummaryList,
                loading: true,
                data: [],
                error: null,
            },
        };

        const store = mockStoreWithState(modifiedState);

        // Act
        const { getByTestId } = renderWithProvider(store);

        // Assert
        expect(getByTestId(restaurantCardListViewTestIds.LoadingIndicator)).toBeTruthy();
        expectDispatchHaveBeenCalledOnce(store);
    });

    it('should render ErrorIndicator when an error occurs and no data is available', () => {
        // Arrange
        const modifiedState = {
            ...mockRootState,
            restaurantSummaryList: {
                ...mockRootState.restaurantSummaryList,
                loading: false,
                data: [],
                error: 'Network error',
            },
        };

        const store = mockStoreWithState(modifiedState);

        // Act
        const { getByTestId } = renderWithProvider(store);

        // Assert
        expect(getByTestId(restaurantCardListViewTestIds.ErrorIndicator)).toBeTruthy();
        expectDispatchHaveBeenCalledOnce(store);
    });

    it('should load more restaurants when reaching the end of the list', async () => {
        // Arrange
        const store = mockStoreWithState(modifiedStateWithData);

        // Act
        const { getByTestId } = renderWithProvider(store);
        const flatList = getByTestId('RestaurantCardListView.FlatList');

        fireEvent(flatList, 'onEndReached');

        //Arrange
        expectDispatchHaveBeenCalled(store, 2);
    });

});
