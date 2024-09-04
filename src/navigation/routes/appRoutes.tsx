import { ComponentType } from "react";
import { AppRoute } from "../models";
import { MainTabNavigator } from "../components";
import { RestaurantDetailsScreen, AuthScreen } from "@features";
import { RestaurantId } from "@models";

// Define the navigation parameter types for each screen
type AppNavigationParams = {
    MainTabs: undefined;
    RestaurantDetails: { restaurantId: RestaurantId; restaurantImageUrl?: string };
    Auth: undefined;
};

// Define a type for each individual route in the app
interface AppNavigationRoute extends AppRoute {
    name: keyof AppNavigationParams;
    component: ComponentType<any>;
}

// Create an object to hold all the app's routes
const appRoutes: Record<keyof AppNavigationParams, AppNavigationRoute> = {
    MainTabs: {
        name: 'MainTabs',
        component: MainTabNavigator,
    },
    RestaurantDetails: {
        name: 'RestaurantDetails',
        component: RestaurantDetailsScreen,
    },
    Auth: {
        name: 'Auth',
        component: AuthScreen,
    }
};

// Export the routes and types for use throughout the app
export { appRoutes, AppNavigationRoute, AppNavigationParams };