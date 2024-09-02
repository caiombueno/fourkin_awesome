
import { store } from '@redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { rootRoutes, RootStackParamList } from '@navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { selectRestaurantDetails } from '@features';

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigationContainer >
          <StatusBar style="auto" />
        </AppNavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

const AppNavigationContainer: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName={rootRoutes.bottomTabs.name}>
      <Stack.Screen
        name={rootRoutes.bottomTabs.name}
        component={rootRoutes.bottomTabs.screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={rootRoutes.restaurantDetails.name}
        component={rootRoutes.restaurantDetails.screen}
        sharedElements={(route, otherRoute, showing) => {
          const { restaurantImageUrl } = route.params;
          return [restaurantImageUrl];
        }}

        options={{
          title: selectRestaurantDetails().data?.name ?? '',
          headerBackTitleVisible: false,
          headerTintColor: 'black',


        }}
      />
      {children}

    </Stack.Navigator>
  </NavigationContainer>
};



export default App;
