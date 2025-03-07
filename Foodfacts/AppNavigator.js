// AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen'; // Import your CameraScreen
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/LoginScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { AuthContext } from './context/AuthContext';
import LogScreen from './screens/LogScreen';
import StatsScreen from './screens/StatsScreen';
import MoreScreen from './screens/MoreScreen';
import { CreateAccountAdditionalInfo } from './screens/CreateAccountAdditionalInfo'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const CreateAccountStack = () => (
  <Stack.Navigator initialRouteName='createAccount'>
    <Stack.Screen name="createAccount" component={LoginScreen} />
    <Stack.Screen name="accountDetails" component={CreateAccountAdditionalInfo}/>
    </Stack.Navigator>
)

const AppNavigator = () => {
  const { user, loading, completedLogIn} = useContext(AuthContext);

  if (loading) return <LoadingScreen />; // Show loading until auth state is resolved
  return (
    
    <NavigationContainer>
      {completedLogIn ? <Tab.Navigator initialRouteName='Scan'>
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Scan" component={CameraScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator> : <CreateAccountStack initialRouteName={user ? "accountDetails" : "createAccount"}/>}
    </NavigationContainer>
  );
};

export default AppNavigator;