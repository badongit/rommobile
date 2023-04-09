import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  CREATE_ORDER_SCREEN,
  DASHBOARD_SCREEN,
  INTRO_SCREEN,
  LOGIN_SCREEN,
  ORDER_SCREEN,
} from 'src/constants/navigate';
import DashboardScreen from 'src/screens/dashboard';
import Intro from 'src/screens/intro';
import LoginScreen from 'src/screens/login';
import OrderScreen from 'src/screens/order';
import CreateOrderScreen from 'src/screens/order/create-order.screen';

const Stack = createNativeStackNavigator();

const MyNavigateContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={CREATE_ORDER_SCREEN}>
        <Stack.Screen
          name={LOGIN_SCREEN}
          component={LoginScreen}
          options={{ title: 'Đăng nhập', headerShown: false }}
        />
        <Stack.Screen name={INTRO_SCREEN} component={Intro} />
        <Stack.Screen
          name={DASHBOARD_SCREEN}
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ORDER_SCREEN}
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CREATE_ORDER_SCREEN}
          component={CreateOrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNavigateContainer;
