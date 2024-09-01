import { ComponentType, FunctionComponent } from "react";
import { AppRoute } from "../models";
import { BottomTabNavigator } from "../components";
import { RestaurantDetailsScreen } from "@features";
import { RestaurantId } from "@models";


type RootStackParamList = {
    BottomTabs: undefined;
    RestaurantDetails: { restaurantId: RestaurantId, restaurantImageUrl?: string }; // Define the parameters for RestaurantDetailsScreen
};

interface RootAppRoute extends AppRoute {
    name: keyof RootStackParamList;
    screen: ComponentType<any>;
}

interface RootAppRoutes {
    bottomTabs: RootAppRoute;
    restaurantDetails: RootAppRoute;
}

const RestaurantDetailsScreenWrapper: ComponentType<{ route: { params: { restaurantId: string, restaurantImageUrl?: string } } }> = ({ route }) => {
    return <RestaurantDetailsScreen restaurantId={route.params.restaurantId} restaurantImageUrl={route.params.restaurantImageUrl} />;
};

const rootRoutes: RootAppRoutes = {
    bottomTabs: {
        name: 'BottomTabs',
        screen: BottomTabNavigator,
    },
    restaurantDetails: {
        name: 'RestaurantDetails',
        screen: RestaurantDetailsScreenWrapper,
    }
}

export default rootRoutes;
export { RootStackParamList, RootAppRoute }