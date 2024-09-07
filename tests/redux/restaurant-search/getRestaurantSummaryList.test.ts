import { restaurantRepository } from '@data';
import { RestaurantSummaryListSerializable } from '@models';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import { getRestaurantSummaryList } from '@features';
import configureMockStore from 'redux-mock-store';

jest.mock('@data', () => ({
    restaurantRepository: {
        getRestaurantSummaryList: jest.fn(),
    },
}));

const mockRestaurantSummaryList: RestaurantSummaryListSerializable = {
    restaurantSummaries: [
        { id: '1', name: 'Restaurant 1', photos: [], categories: [], isOpenNow: true, price: '$$', rating: 4.5 },
        { id: '2', name: 'Restaurant 2', photos: [], categories: [], isOpenNow: true, price: '$$', rating: 4.5 },
    ],
    total: 2,
};

const middlewares: ThunkMiddleware[] = [thunk];
const mockStore = configureMockStore(middlewares as any);

describe('getRestaurantSummaryList async thunk', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({});
    });

    it('dispatches fulfilled action with data when repository call is successful', async () => {
        // Arrange
        (restaurantRepository.getRestaurantSummaryList as jest.Mock).mockResolvedValueOnce({
            toSerializable: () => mockRestaurantSummaryList,
        });

        const location = 'Los Angeles';
        const offset = 0;
        const limit = 10;

        // Act
        await store.dispatch<any>(getRestaurantSummaryList({ location, offset, limit }));

        // Assert
        const actions = store.getActions(); // getActions() is provided by redux-mock-store
        expect(actions[0].type).toEqual(getRestaurantSummaryList.pending.type);
        expect(actions[1].type).toEqual(getRestaurantSummaryList.fulfilled.type);
        expect(actions[1].payload).toEqual({
            data: mockRestaurantSummaryList,
            offset,
        });
    });

    it('dispatches rejected action with error when repository call fails', async () => {
        // Arrange
        (restaurantRepository.getRestaurantSummaryList as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        const location = 'Los Angeles';
        const offset = 0;
        const limit = 10;

        // Act
        await store.dispatch<any>(getRestaurantSummaryList({ location, offset, limit }));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(getRestaurantSummaryList.pending.type);
        expect(actions[1].type).toEqual(getRestaurantSummaryList.rejected.type);
        expect(actions[1].error.message).toEqual('Network Error');
    });
});
