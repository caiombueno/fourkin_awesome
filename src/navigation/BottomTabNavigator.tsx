import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import bottomTabNavigatorRoutes from "./bottomTabNavigatorRoutes";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const iconName = getRouteFromName(route.name).ioniconName;

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
            })}
        >
            {bottomTabNavigatorRoutes.map((route) => <Tab.Screen key={route.name} name={route.name} component={route.component} />)}
        </Tab.Navigator>
    );
};

const getRouteFromName = (name: string) => {
    const route = bottomTabNavigatorRoutes.find((route) => route.name === name);
    if (!route) {
        throw new Error(`Route with name ${name} not found`);
    }
    return route;
}

export default BottomTabNavigator;