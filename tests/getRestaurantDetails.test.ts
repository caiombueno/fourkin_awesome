import { restaurantRepository } from '@data';
import { getRestaurantDetails } from '@features';
import configureMockStore from 'redux-mock-store';
import { thunk, ThunkMiddleware } from 'redux-thunk';

jest.mock('@data', () => ({
    restaurantRepository: {
        getRestaurantDetails: jest.fn(),
    },
}));

const mockRestaurantDetails = {
    id: '1',
    name: 'Restaurant 1',
    address: '123 Main St',
    rating: 4.5,
    price: '$$$',
    categories: ['Italian', 'Pizza'],
    isOpenNow: true,
    reviews: [],
};

const middlewares: ThunkMiddleware[] = [thunk];
const mockStore = configureMockStore(middlewares as any);

describe('getRestaurantDetails async thunk', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({});
    });

    it('dispatches fulfilled action with data when repository call is successful', async () => {
        // Arrange
        (restaurantRepository.getRestaurantDetails as jest.Mock).mockResolvedValueOnce({
            toSerializable: () => mockRestaurantDetails,
        });

        const id = '1';

        // Act
        await store.dispatch<any>(getRestaurantDetails({ id }));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(getRestaurantDetails.pending.type);
        expect(actions[1].type).toEqual(getRestaurantDetails.fulfilled.type);
        expect(actions[1].payload).toEqual(mockRestaurantDetails);
    });

    it('dispatches rejected action with error when repository call fails', async () => {
        // Arrange
        (restaurantRepository.getRestaurantDetails as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        const id = '1';

        // Act
        await store.dispatch<any>(getRestaurantDetails({ id }));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(getRestaurantDetails.pending.type);
        expect(actions[1].type).toEqual(getRestaurantDetails.rejected.type);
        expect(actions[1].error.message).toEqual('Network Error');
    });
});
