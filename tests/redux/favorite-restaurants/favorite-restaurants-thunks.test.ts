import { favoriteRestaurantsManager } from '@data';
import { addFavoriteRestaurant, getFavoriteRestaurants, removeFavoriteRestaurant } from '@features';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

jest.mock('../../../src/data', () => ({
    favoriteRestaurantsManager: {
        addFavoriteRestaurantId: jest.fn(),
        removeFavoriteRestaurantId: jest.fn(),
        getFavoriteRestaurantsIds: jest.fn(),
    },
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as any);
let store: ReturnType<typeof mockStore>;

beforeEach(() => {
    store = mockStore({});
});

describe('addFavoriteRestaurant async thunk', () => {
    const restaurantId = 'restaurant123';

    it('dispatches fulfilled action when adding a favorite restaurant is successful', async () => {
        // Arrange
        (favoriteRestaurantsManager.addFavoriteRestaurantId as jest.Mock).mockResolvedValueOnce(undefined);

        // Act
        await store.dispatch<any>(addFavoriteRestaurant(restaurantId));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(addFavoriteRestaurant.pending.type);
        expect(actions[1].type).toEqual(addFavoriteRestaurant.fulfilled.type);
    });

    it('dispatches rejected action with error message when adding fails', async () => {
        // Arrange
        const errorMessage = 'Failed to add restaurant';
        (favoriteRestaurantsManager.addFavoriteRestaurantId as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        // Act
        await store.dispatch<any>(addFavoriteRestaurant(restaurantId));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(addFavoriteRestaurant.pending.type);
        expect(actions[1].type).toEqual(addFavoriteRestaurant.rejected.type);
        expect(actions[1].payload).toEqual(errorMessage);
    });
});

describe('addFavoriteRestaurant async thunk', () => {
    const restaurantId = 'restaurant123';

    it('dispatches fulfilled action when adding a favorite restaurant is successful', async () => {
        // Arrange
        (favoriteRestaurantsManager.addFavoriteRestaurantId as jest.Mock).mockResolvedValueOnce(undefined);

        // Act
        await store.dispatch<any>(addFavoriteRestaurant(restaurantId));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(addFavoriteRestaurant.pending.type);
        expect(actions[1].type).toEqual(addFavoriteRestaurant.fulfilled.type);
    });

    it('dispatches rejected action with error message when adding fails', async () => {
        // Arrange
        const errorMessage = 'Failed to add restaurant';
        (favoriteRestaurantsManager.addFavoriteRestaurantId as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        // Act
        await store.dispatch<any>(addFavoriteRestaurant(restaurantId));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(addFavoriteRestaurant.pending.type);
        expect(actions[1].type).toEqual(addFavoriteRestaurant.rejected.type);
        expect(actions[1].payload).toEqual(errorMessage);
    });
});

describe('removeFavoriteRestaurant async thunk', () => {
    const restaurantId = 'restaurant123';

    it('dispatches fulfilled action when removing a favorite restaurant is successful', async () => {
        // Arrange
        (favoriteRestaurantsManager.removeFavoriteRestaurantId as jest.Mock).mockResolvedValueOnce(undefined);

        // Act
        await store.dispatch<any>(removeFavoriteRestaurant(restaurantId));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(removeFavoriteRestaurant.pending.type);
        expect(actions[1].type).toEqual(removeFavoriteRestaurant.fulfilled.type);
    });

    it('dispatches rejected action with error message when removing fails', async () => {
        // Arrange
        const errorMessage = 'Failed to remove restaurant';
        (favoriteRestaurantsManager.removeFavoriteRestaurantId as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        // Act
        await store.dispatch<any>(removeFavoriteRestaurant(restaurantId));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(removeFavoriteRestaurant.pending.type);
        expect(actions[1].type).toEqual(removeFavoriteRestaurant.rejected.type);
        expect(actions[1].payload).toEqual(errorMessage);
    });
});

describe('getFavoriteRestaurants async thunk', () => {
    const mockFavoriteList = {
        total: 2,
        restaurantSummaries: [
            { id: 'restaurant1', name: 'Restaurant 1' },
            { id: 'restaurant2', name: 'Restaurant 2' },
        ],
        toSerializable: jest.fn().mockReturnValue({
            total: 2,
            restaurantSummaries: [
                { id: 'restaurant1', name: 'Restaurant 1' },
                { id: 'restaurant2', name: 'Restaurant 2' },
            ],
        }),
    };

    it('dispatches fulfilled action when fetching favorite restaurants is successful', async () => {
        // Arrange
        (favoriteRestaurantsManager.getFavoriteRestaurantsIds as jest.Mock).mockResolvedValueOnce(mockFavoriteList);

        // Act
        await store.dispatch<any>(getFavoriteRestaurants());

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(getFavoriteRestaurants.pending.type);
        expect(actions[1].type).toEqual(getFavoriteRestaurants.fulfilled.type);
        expect(actions[1].payload).toEqual(mockFavoriteList.toSerializable());
    });

    it('dispatches rejected action with error message when fetching fails', async () => {
        // Arrange
        const errorMessage = 'Failed to fetch favorite restaurants';
        (favoriteRestaurantsManager.getFavoriteRestaurantsIds as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        // Act
        await store.dispatch<any>(getFavoriteRestaurants());

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(getFavoriteRestaurants.pending.type);
        expect(actions[1].type).toEqual(getFavoriteRestaurants.rejected.type);
        expect(actions[1].payload).toEqual(errorMessage);
    });
});