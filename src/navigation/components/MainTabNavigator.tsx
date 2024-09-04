import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from "react";
import { MainTabParamList, MainTabRoute, mainTabRoutes } from "../routes/mainTabRoutes";


const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
    // Memoize the routes to avoid recalculating them on every render
    const mainTabRouteValues = useMemo(() => Object.values(mainTabRoutes) as MainTabRoute[], []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                // Get the route metadata for the icon dynamically
                const currentRoute = getRouteFromName(mainTabRouteValues, route.name);

                return {
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name={currentRoute.ioniconName} size={size} color={color} />;
                    },
                    headerShown: false,
                };
            }}
        >
            {
                mainTabRouteValues.map((route) => (
                    <Tab.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                    />
                ))
            }
        </Tab.Navigator>
    );
};

// Memoize the logic to retrieve the route metadata based on the route name
const getRouteFromName = (routes: MainTabRoute[], name: string): MainTabRoute => {
    const route = routes.find(route => route.name === name);
    if (!route) {
        throw new Error(`Route with name "${name}" not found`);
    }
    return route;
};

export default MainTabNavigator;