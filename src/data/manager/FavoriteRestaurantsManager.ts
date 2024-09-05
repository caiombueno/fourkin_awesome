import { RestaurantId, RestaurantSummaryList, UnauthenticatedError } from "@models";
import { authRepository, favoriteRestaurantsRepository, restaurantRepository } from "../repository";

class FavoriteRestaurantsManager {
    private get currentUserId() {
        const currentUserId = authRepository.currentUser?.uid;
        if (!currentUserId) {
            throw new UnauthenticatedError();
        }
        return currentUserId;
    }

    async addFavoriteRestaurantId({ restaurantId }: { restaurantId: RestaurantId }) {
        await favoriteRestaurantsRepository.addFavoriteRestaurantId({ userId: this.currentUserId, restaurantId });
    }

    async getFavoriteRestaurantsIds(): Promise<RestaurantSummaryList> {
        const restaurantIds = await favoriteRestaurantsRepository.getFavoriteRestaurantsIds({ userId: this.currentUserId });

        const restaurantSummaries = [];
        for (const restaurantId of restaurantIds) {
            const restaurantSummary = await restaurantRepository.getRestaurantSummary({ id: restaurantId });
            restaurantSummaries.push(restaurantSummary);
        }
        return new RestaurantSummaryList(restaurantSummaries.length, restaurantSummaries);
    }

    async removeFavoriteRestaurantId({ restaurantId }: { restaurantId: RestaurantId }) {
        await favoriteRestaurantsRepository.removeFavoriteRestaurantId({ userId: this.currentUserId, restaurantId });
    }
}

const favoriteRestaurantsManager = new FavoriteRestaurantsManager();
export { favoriteRestaurantsManager };