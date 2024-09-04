import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import bottomTabRoutes, { BottomTabParamList, BottomTabRoute } from "../routes/bottomTabRoutes";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const bottomTabRoutesValues = Object.values(bottomTabRoutes) as BottomTabRoute[];

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const iconName = getRouteFromName(route.name).ioniconName;

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                headerShown: false,
            })}
        >
            {
                bottomTabRoutesValues.map((route) =>
                    <Tab.Screen
                        key={route.name}
                        name={route.name}
                        component={route.screen}
                    />
                )
            }
        </Tab.Navigator>
    );
};

const getRouteFromName = (name: string) => {
    const route = bottomTabRoutesValues.find((route) => route.name === name);
    if (!route) {
        throw new Error(`Route with name ${name} not found`);
    }
    return route;
}

export default BottomTabNavigator;