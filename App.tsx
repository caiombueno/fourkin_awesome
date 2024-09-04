import { store } from '@redux';
import { NavigationContainer } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { selectCurrentUser, selectRestaurantDetails } from '@features';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { AppNavigationParams, appRoutes } from '@navigation';

const Stack = createNativeStackNavigator<AppNavigationParams>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigationContainer>
          <ExpoStatusBar style="auto" />
        </AppNavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

const AppNavigationContainer: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const user = selectCurrentUser(); // Access the user from Redux state
  const restaurantDetails = selectRestaurantDetails().data;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? appRoutes.MainTabs.name : appRoutes.Auth.name}>
        <Stack.Screen
          name={appRoutes.Auth.name}
          component={appRoutes.Auth.component}
          options={{ headerShown: false }} // Conditionally show header based on user auth
        />
        <Stack.Screen
          name={appRoutes.MainTabs.name}
          component={appRoutes.MainTabs.component}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={appRoutes.RestaurantDetails.name}
          component={appRoutes.RestaurantDetails.component}
          options={{
            title: restaurantDetails?.name ?? '',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
      </Stack.Navigator>
      {children}
    </NavigationContainer>
  );
};

export default App;