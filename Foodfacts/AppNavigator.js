import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './context/AuthContext';

// Import Screens
import CameraScreen from './screens/CameraScreen';
import FoodDetails from './screens/FoodDetails';
import LogScreen from './screens/LogScreen';
import StatsScreen from './screens/StatsScreen';
import MoreScreen from './screens/MoreScreen';
import { LoginScreen } from './screens/LoginScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { CreateAccountAdditionalInfo } from './screens/CreateAccountAdditionalInfo';
import {Profile} from './screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create Stack Navigator for Scan (Camera) Screen
const ScanStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ScanMain" component={CameraScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FoodDetails" component={FoodDetails} />
  </Stack.Navigator>
);

// Create Tab Navigation
const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Scan">
    <Tab.Screen name="Log" component={LogScreen} />
    <Tab.Screen name="Stats" component={StatsScreen} />
    <Tab.Screen name="Scan" component={ScanStack} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={Profile}/>
    <Tab.Screen name="More" component={MoreScreen} />
  </Tab.Navigator>
);

const CreateAccountStack = () => (
  <Stack.Navigator initialRouteName="createAccount">
    <Stack.Screen name="createAccount" component={LoginScreen} />
    <Stack.Screen name="accountDetails" component={CreateAccountAdditionalInfo} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user, loading, completedLogIn } = useContext(AuthContext);

  if (loading) return <LoadingScreen />; // Show loading until auth state is resolved

  return (
    <NavigationContainer>
      {completedLogIn ? <TabNavigator /> : <CreateAccountStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
