import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  Button,
  Box,
  Center,
  Heading,
  Icon,
  Pressable,
  VStack,
  Spinner,
  HStack,
  Text,
} from 'native-base';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputControl from 'src/components/InputControl';
import { LoginForm } from 'src/types/auth/login-form.type';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from 'src/hooks/useAuth';
import { authService } from 'src/services/auth.service';

// type Inputs = {
//   value: string;
//   // exampleRequired: string,
// };
function LoginScreen(props: any) {
  const [showPass, setShowPass] = useState(false);
  const { actions, isLoading } = useAuth();
  const { ...methods } = useForm<LoginForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    // actions.login(
    //   data,
    //   (response: any) => {
    //     console.log(
    //       '🚀 ~ file: index.tsx:33 ~ LoginScreen ~ response:',
    //       response,
    //     );
    //   },
    //   (error: any) => {
    //     console.log('🚀 ~ file: index.tsx:38 ~ LoginScreen ~ error:', error);
    //   },
    // );
    const response = await authService.login(data);
    console.log(
      '🚀 ~ file: index.tsx:46 ~ constonSubmit:SubmitHandler<LoginForm>= ~ response:',
      response,
    );
  };

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
        <FormProvider {...methods}>
          <VStack w="80%" space={4}>
            <InputControl
              name="phoneNumber"
              placeholder="Số điện thoại"
              rules={{ required: 'Số điện thoại là bắt buộc' }}
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
              rules={{ required: 'Mật khẩu là bắt buộc' }}
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
              disabled={isLoading}
              onPress={methods.handleSubmit(onSubmit)}>
              <HStack space={2}>
                {isLoading && <Spinner color="light.50" />}
                <Text color="light.50">ĐĂNG NHẬP</Text>
              </HStack>
            </Button>
          </VStack>
        </FormProvider>
      </Center>
    </SafeAreaView>
  );
}

export default LoginScreen;
