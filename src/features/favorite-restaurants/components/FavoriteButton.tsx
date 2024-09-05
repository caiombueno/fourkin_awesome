import { RestaurantId } from "@models";
import { AppDispatch, RootState } from "@redux";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteRestaurant, getFavoriteRestaurants, removeFavoriteRestaurant } from "../redux";
import { useEffect } from "react";
import { IconButton } from "react-native-paper";

const FavoriteButton: React.FC<{ restaurantId: RestaurantId }> = ({ restaurantId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const favoriteRestaurantsList = useSelector((state: RootState) => state.favoriteRestaurants.favoriteRestaurantSummaryList)?.restaurantSummaries ?? [];
    const isFavorite = favoriteRestaurantsList.find((restaurant) => restaurant.id === restaurantId) !== undefined;

    useEffect(() => {
        dispatch(getFavoriteRestaurants());
    });

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavoriteRestaurant(restaurantId));
        } else {
            dispatch(addFavoriteRestaurant(restaurantId));
        }
        dispatch(getFavoriteRestaurants());
    };

    return (
        <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            onPress={toggleFavorite}
        />
    );
};

export { FavoriteButton };