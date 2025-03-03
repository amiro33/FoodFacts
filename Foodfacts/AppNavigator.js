// AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen'; // Import your CameraScreen
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './screens/LoginScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { AuthContext } from './context/AuthContext';
import LogScreen from './screens/LogScreen';
import StatsScreen from './screens/StatsScreen';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingScreen />; // Show loading until auth state is resolved
  return (
    
    <NavigationContainer>
      {user ? <Tab.Navigator initialRouteName="Scan">
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Scan" component={CameraScreen} />
      </Tab.Navigator> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;