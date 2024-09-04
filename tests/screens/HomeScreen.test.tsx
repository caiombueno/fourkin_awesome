import React from 'react';
import { render } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HomeScreen } from '@features';
import { componentsTestIds, mockRootState } from '../utils';

const mockStore = configureStore([]);

describe('HomeScreen', () => {

  const restaurantCardListViewTestIds = componentsTestIds.RestaurantCardListView;

  const expectRenderHomeScreenHeader = (getByTestId: any) => { expect(getByTestId('HomeScreenHeader')).toBeTruthy(); }

  const renderHomeScreenWithProvider = (store: any) => render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );

  const mockStoreWithState = (state: any) => {
    const store = mockStore(state);
    store.dispatch = jest.fn();

    return store;
  }

  it('should render RestaurantCardListView when location is set', () => {
    // Arrange
    const modifiedState = {
      ...mockRootState,
      restaurantSummaryListSearchInput: {
        ...mockRootState.restaurantSummaryListSearchInput,
        location: 'Los Angeles, California, USA',
      },
    };

    const store = mockStoreWithState(modifiedState);

    // Act
    const { getByTestId } = renderHomeScreenWithProvider(store);

    // Assert
    expectRenderHomeScreenHeader(getByTestId);
    expect(getByTestId(restaurantCardListViewTestIds.FlatList)).toBeTruthy();
  });

  it('should render EmptyLocationIndicator when location is empty', async () => {
    // Arrange
    const modifiedState = {
      ...mockRootState,
      restaurantSummaryListSearchInput: {
        ...mockRootState.restaurantSummaryListSearchInput,
        location: '', // Modify the location only for this test
      },
    };

    const store = mockStoreWithState(modifiedState);

    // Act
    const { getByTestId, queryByTestId } = renderHomeScreenWithProvider(store);

    // Assert
    expectRenderHomeScreenHeader(getByTestId);
    expect(getByTestId(componentsTestIds.EmptyLocationIndicator)).toBeTruthy();

    // Ensure RestaurantCardListView is not rendered
    expect(queryByTestId(restaurantCardListViewTestIds.FlatList)).toBeNull();
    expect(queryByTestId(restaurantCardListViewTestIds.LoadingIndicator)).toBeNull();
    expect(queryByTestId(restaurantCardListViewTestIds.ErrorIndicator)).toBeNull();
  });
});
