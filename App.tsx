
import { store } from '@redux';
import { BottomTabNavigator } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <BottomTabNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
