
import { store } from '@redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { rootRoutes, RootStackParamList } from '@navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
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
                title: '',
                headerBackTitleVisible: false,



              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};




export default App;
