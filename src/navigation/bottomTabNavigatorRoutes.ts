import HomeScreen from "@features/restaurant-search/screens/HomeScreen";
import FavoriteRestaurantsScreen from "@features/favorite-restaurants/screens/FavoriteRestaurantsScreen";
import AccountScreen from "@features/authentication/screens/AccountScreen";
import { ComponentType } from "react";

enum IoniconNames {
    home = 'home',
    heart = 'heart',
    person = 'person',
}

interface BottomTabNavigatorRoute {
    name: string;
    ioniconName: IoniconNames;
    component: ComponentType;
}

/**  A list of all the routes for the bottom tab navigator. */
const bottomTabNavigatorRoutes: BottomTabNavigatorRoute[] = [
    { name: 'Home', ioniconName: IoniconNames.home, component: HomeScreen },
    { name: 'Favorites', ioniconName: IoniconNames.heart, component: FavoriteRestaurantsScreen },
    { name: 'Account', ioniconName: IoniconNames.person, component: AccountScreen },
];

export default bottomTabNavigatorRoutes;