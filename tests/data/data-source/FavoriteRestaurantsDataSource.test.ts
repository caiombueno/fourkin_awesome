import { favoriteRestaurantsDataSource } from '@data';
import { setDoc, getDocs, deleteDoc, query, where, collection, doc } from 'firebase/firestore';
import { db } from '@firebaseConfig';

jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    getDocs: jest.fn(),
    deleteDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    collection: jest.fn(),
    getFirestore: jest.fn(),
    doc: jest.fn(),
}));

describe('FavoriteRestaurantsDataSource', () => {
    const userId = 'testUserId';
    const restaurantId = 'testRestaurantId';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a favorite restaurant', async () => {
        // Arrange
        const mockDocRef = {};
        (doc as jest.Mock).mockReturnValue(mockDocRef);
        (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

        // Act
        await favoriteRestaurantsDataSource.addFavoriteRestaurantId({ userId, restaurantId });

        // Assert
        expect(doc).toHaveBeenCalledWith(db, 'favorites', `${userId}_${restaurantId}`);
        expect(setDoc).toHaveBeenCalledWith(mockDocRef, { userId, restaurantId });
    });

    it('should get favorite restaurants IDs', async () => {
        // Arrange
        const mockDocs = [
            { data: () => ({ restaurantId: 'restaurant1' }) },
            { data: () => ({ restaurantId: 'restaurant2' }) },
        ];

        (collection as jest.Mock).mockReturnValue('favoritesCollection');
        (where as jest.Mock).mockReturnValue('whereCondition');
        (query as jest.Mock).mockReturnValue('mockQuery');
        (getDocs as jest.Mock).mockResolvedValueOnce(mockDocs);

        // Act
        const restaurantIds = await favoriteRestaurantsDataSource.getFavoriteRestaurantsIds({ userId });

        // Assert
        expect(query).toHaveBeenCalledWith(
            'favoritesCollection',
            'whereCondition'
        );
        expect(getDocs).toHaveBeenCalledWith('mockQuery');
        expect(restaurantIds).toEqual(['restaurant1', 'restaurant2']);
    });

    it('should remove a favorite restaurant', async () => {
        // Arrange
        const mockDocRef = {};
        (doc as jest.Mock).mockReturnValue(mockDocRef);
        (deleteDoc as jest.Mock).mockResolvedValueOnce(undefined);

        // Act
        await favoriteRestaurantsDataSource.removeFavoriteRestaurantId({ userId, restaurantId });

        // Assert
        expect(doc).toHaveBeenCalledWith(db, 'favorites', `${userId}_${restaurantId}`);
        expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
    });
});