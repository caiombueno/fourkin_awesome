import HomeScreen from '@features/restaurant-search/screens/HomeScreen';
import store from '@features/restaurant-search/screens/redux/store';
import BottomTabNavigator from '@navigation/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>

    </Provider>
  );
};

export default App;
