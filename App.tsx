
import { store } from '@redux';
import { NavigationContainer } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { rootRoutes, RootStackParamList } from '@navigation';
import { selectRestaurantDetails } from '@features';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigationContainer >
          <ExpoStatusBar style="auto" />
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

        options={{
          title: selectRestaurantDetails().data?.name ?? '',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />


    </Stack.Navigator>
    {children}
  </NavigationContainer>
};



export default App;
