import React, { ComponentType } from "react";
import { AppRoute } from "../models";

import { View, Text } from "react-native";
import { BottomTabNavigator } from "../components";

const RestaurantDetailsScreen = () => {
    return (<View>
        <Text>Restaurant Details </Text>
    </View>);
};

type RootStackParamList = {
    BottomTabs: undefined;
    RestaurantDetails: undefined; // Define the parameters for RestaurantDetailsScreen
};

interface RootAppRoute extends AppRoute {
    name: keyof RootStackParamList;
    screen: ComponentType;
}

interface RootAppRoutes {
    bottomTabs: RootAppRoute;
    restaurantDetails: RootAppRoute;
}

const rootRoutes: RootAppRoutes = {
    bottomTabs: {
        name: 'BottomTabs',
        screen: BottomTabNavigator,
    },
    restaurantDetails: {
        name: 'RestaurantDetails',
        screen: RestaurantDetailsScreen,
    }
}

export default rootRoutes;
export { RootStackParamList, RootAppRoute }