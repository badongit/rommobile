import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  DASHBOARD_SCREEN,
  INTRO_SCREEN,
  LOGIN_SCREEN,
} from 'src/constants/navigate';
import DashboardScreen from 'src/screens/dashboard';
import Intro from 'src/screens/intro';
import LoginScreen from 'src/screens/login';

const Stack = createNativeStackNavigator();

const MyNavigateContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={DASHBOARD_SCREEN}>
        <Stack.Screen
          name={LOGIN_SCREEN}
          component={LoginScreen}
          options={{ title: 'Đăng nhập', headerShown: false }}
        />
        <Stack.Screen name={INTRO_SCREEN} component={Intro} />
        <Stack.Screen name={DASHBOARD_SCREEN} component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNavigateContainer;
