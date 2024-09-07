import { db } from '@firebaseConfig';
import { RestaurantId, UserId } from '@models';
import { doc, setDoc, getDocs, deleteDoc, query, where, collection } from 'firebase/firestore';


class FavoriteRestaurantsDataSource {
    // Add a restaurant to the user's favorites
    async addFavoriteRestaurantId({ userId, restaurantId }: { userId: UserId, restaurantId: RestaurantId }): Promise<void> {
        await setDoc(doc(db, 'favorites', `${userId}_${restaurantId}`), {
            userId,
            restaurantId: restaurantId,
        });

    }

    // Get all favorite restaurants for a user
    async getFavoriteRestaurantsIds({ userId }: { userId: UserId }): Promise<RestaurantId[]> {

        const q = query(collection(db, 'favorites'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const favorites: RestaurantId[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            favorites.push(data.restaurantId);
        });
        return favorites;

    }

    // Remove a restaurant from the user's favorites
    async removeFavoriteRestaurantId({ userId, restaurantId }: { userId: UserId, restaurantId: RestaurantId }): Promise<void> {

        await deleteDoc(doc(db, 'favorites', `${userId}_${restaurantId}`));

    }
}

const favoriteRestaurantsDataSource = new FavoriteRestaurantsDataSource();
export { favoriteRestaurantsDataSource };