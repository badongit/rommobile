import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView } from 'react-native';
import {
  Button,
  Box,
  Center,
  Heading,
  Icon,
  Pressable,
  VStack,
} from 'native-base';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputControl from 'src/components/InputControl';
import { LoginForm } from 'src/types/auth/login-form.type';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// type Inputs = {
//   value: string;
//   // exampleRequired: string,
// };
function LoginScreen(props: any) {
  const { navigation } = props;
  const [showPass, setShowPass] = useState(false);

  const { ...methods } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data: any) => {
    console.log('🚀 ~ file: index.tsx:57 ~ LoginScreen ~ data:', data);
  };

  function onChange(event: any): void {
    console.log('🚀 ~ file: index.tsx:33 ~ onChange ~ event:', event);
  }

  return (
    <SafeAreaView>
      <Center w="100%" py="100">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          alignItems="center"
          py="5">
          Đăng nhập
        </Heading>
        {/* <Button
          title="Intro"
          onPress={() => navigation.navigate('INTRO_SCREEN')}
        /> */}
        <VStack w="80%" space={4}>
          <FormProvider {...methods}>
            <InputControl
              name="phoneNumber"
              placeholder="Số điện thoại"
              InputRightElement={
                <Icon
                  as={<AntDesign name="user" size={24} color="black" />}
                  mr="2"
                />
              }
              {...methods.control._fields['phoneNumber']}
            />
            <InputControl
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="Mật khẩu"
              onChange={onChange}
              InputRightElement={
                <Pressable onPress={() => setShowPass(!showPass)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPass ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="black"
                      />
                    }
                    mr="2"
                  />
                </Pressable>
              }
            />
            <Button onPress={methods.handleSubmit(onSubmit)}>Đăng nhập</Button>
          </FormProvider>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}

export default LoginScreen;
