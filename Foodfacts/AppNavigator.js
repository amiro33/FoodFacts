// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen'; // Import your CameraScreen
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './screens/LoginScreen';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Scan">
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Log" component={CameraScreen} />
        <Tab.Screen name="Stats" component={CameraScreen} />
        <Tab.Screen name="Scan" component={CameraScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;