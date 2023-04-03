import React from 'react';
import {Button, Text, SafeAreaView} from 'react-native';
import {Box} from 'native-base';

function LoginScreen(props: any) {
  const {navigation} = props;

  return (
    <SafeAreaView>
      <Box alignItems="center">
        <Text>LoginScreen</Text>
        <Button
          title="Intro"
          onPress={() => navigation.navigate('INTRO_SCREEN')}
        />
      </Box>
    </SafeAreaView>
  );
}

export default LoginScreen;
