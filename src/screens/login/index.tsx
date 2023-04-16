import {
  Center,
  Heading,
  Icon,
  Image,
  Pressable,
  Spinner,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from 'src/components/Button';
import { DismissKeyboardView } from 'src/components/DismissKeyboardView';
import InputControl from 'src/components/InputControl';
import { SPLASH_SCREEN } from 'src/constants/navigate';
import { useAuth } from 'src/hooks/useAuth';
import { ILoginForm } from 'src/types/auth/login-form.type';
const logoImg = require('src/assets/images/logo.png');

function LoginScreen(props: any) {
  const { navigation } = props;
  const [showPass, setShowPass] = useState(false);
  const { actions, isLoading } = useAuth();
  const methods = useForm<ILoginForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
    if (data.phoneNumber && data.password) {
      actions.login(
        data,
        () => {
          navigation.navigate(SPLASH_SCREEN);
        },
        (error: any) => {
          methods.setError('phoneNumber', { message: error?.message });
        },
      );
    }
  };

  return (
    <DismissKeyboardView enabled={true}>
      <Center w="100%" flex={1} backgroundColor="white">
        <Image source={logoImg} alt="logo" w="200px" h="200px" />
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          alignItems="center"
          py="5">
          Đăng nhập
        </Heading>
        <FormProvider {...methods}>
          <VStack w="80%" space={4}>
            <InputControl
              name="phoneNumber"
              placeholder="Số điện thoại"
              keyboardType="number-pad"
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
            <Button
              mx="4"
              disabled={isLoading}
              onPress={methods.handleSubmit(onSubmit)}
              title="ĐĂNG NHẬP"
              leftIcon={isLoading && <Spinner color="light.50" />}
            />
          </VStack>
        </FormProvider>
      </Center>
    </DismissKeyboardView>
  );
}

export default LoginScreen;
