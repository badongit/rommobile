import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/login';
import {INTRO_SCREEN, LOGIN_SCREEN} from '../../constants/navigate';
import Intro from '../../screens/intro';

const Stack = createNativeStackNavigator();

const MyNavigateContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={LOGIN_SCREEN}
          component={LoginScreen}
          options={{title: 'Đăng nhập', headerShown: false}}
        />
        <Stack.Screen name={INTRO_SCREEN} component={Intro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNavigateContainer;
