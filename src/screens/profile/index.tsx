import { HStack, ScrollView, Text, VStack, View } from 'native-base';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import CustomButton from 'src/components/Button';
import InputControl from 'src/components/InputControl';
import { useAuth } from 'src/hooks/useAuth';
import { IUpdateEmployee } from 'src/types/employee/update-profile.type';
import { formatToDate } from 'src/utils/common';
import { useEffect, useState } from 'react';
import { IUpdatePassword } from 'src/types/employee/update-password.type';

const ProfileScreen = (props: any) => {
  const { userInfo, actions } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { ...methods } = useForm<IUpdateEmployee>({
    mode: 'onChange',
    defaultValues: {
      id: userInfo.id,
      phoneNumber: userInfo.phoneNumber,
      name: userInfo.name,
    },
  });

  const [isLoadingPass, setIsLoadingPass] = useState(false);
  const { ...methodsPass } = useForm<IUpdatePassword>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    actions.getMe();
  }, []);

  const onSubmit: SubmitHandler<IUpdateEmployee> = async (
    data: IUpdateEmployee,
  ) => {
    if (data.phoneNumber && data.name) {
      setIsLoading(true);
      actions.updateMe(
        data,
        (response: any) => {
          actions.getMe();
          setIsLoading(false);
          showMessage({
            message:
              typeof response?.message === 'string'
                ? response?.message
                : 'Thành công',
            type: 'success',
          });
        },
        (error: any) => {
          setIsLoading(false);
          showMessage({
            message:
              typeof error?.message === 'string'
                ? error?.message
                : 'Đã có lỗi xảy ra',
            type: 'danger',
          });
        },
      );
    }
  };

  const onSubmitPass: SubmitHandler<IUpdatePassword> = async (
    data: IUpdatePassword,
  ) => {
    if (data.password && data.newPassword) {
      setIsLoadingPass(true);
      actions.updatePassword(
        data,
        (response: any) => {
          setIsLoadingPass(false);
          showMessage({
            message:
              typeof response?.message === 'string'
                ? response?.message
                : 'Thành công',
            type: 'success',
          });
        },
        (error: any) => {
          setIsLoadingPass(false);
          showMessage({
            message:
              typeof error?.message === 'string'
                ? error?.message
                : 'Đã có lỗi xảy ra',
            type: 'danger',
          });
        },
      );
    }
  };

  return (
    <ScrollView p={4}>
      <View backgroundColor="white" borderRadius="lg" p={4}>
        <FormProvider {...methods}>
          <VStack w="full" space={2}>
            <HStack alignItems="center">
              <Text>Họ tên: </Text>
              <View flex={1}>
                <InputControl
                  name="name"
                  placeholder=""
                  size="md"
                  variant="underlined"
                  px={2}
                  py={0}
                  rules={{
                    required: 'Họ tên là bắt buộc',
                  }}
                />
              </View>
            </HStack>
            <Text>
              Mã nhân viên: <Text fontWeight="semibold">{userInfo.code}</Text>
            </Text>
            <Text>
              Vai trò: <Text fontWeight="semibold">{userInfo?.role?.name}</Text>
            </Text>
            <HStack alignItems="center">
              <Text>SĐT: </Text>
              <View flex={1}>
                <InputControl
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                  size="md"
                  px={2}
                  py={1}
                  keyboardType="number-pad"
                  variant="underlined"
                  rules={{
                    required: 'Số điện thoại là bắt buộc',
                    minLength: {
                      value: 10,
                      message: 'Số điện thoại không hợp lệ',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Số điện thoại không hợp lệ',
                    },
                    pattern: {
                      value: /(0)+([0-9]{9})\b/,
                      message: 'Số điện thoại không đúng định dạng',
                    },
                  }}
                />
              </View>
            </HStack>

            <Text>
              Ngày vào:{' '}
              <Text fontWeight="semibold">
                {userInfo.dateJoin
                  ? formatToDate(userInfo.dateJoin)?.split(',')?.[1]
                  : ''}
              </Text>
            </Text>
            <HStack justifyContent="flex-end" space={2}>
              <CustomButton
                isLoading={isLoading}
                px="4"
                title="Lưu"
                disabled={!methods.formState.isValid || isLoading}
                onPress={methods.handleSubmit(onSubmit)}
                flex={1 / 3}
              />
            </HStack>
          </VStack>
        </FormProvider>
      </View>

      <View backgroundColor="white" borderRadius="lg" p={4}>
        <FormProvider {...methodsPass}>
          <VStack w="full" space={2}>
            <HStack alignItems="center">
              <Text>Mật khẩu cũ: </Text>
              <View flex={1}>
                <InputControl
                  name="password"
                  placeholder=""
                  size="md"
                  variant="underlined"
                  px={2}
                  py={0}
                  rules={{
                    required: 'Mật khẩu là bắt buộc',
                    minLength: {
                      value: 8,
                      message: 'Mật khẩu tối thiểu 8 kí tự',
                    },
                  }}
                />
              </View>
            </HStack>
            <HStack alignItems="center">
              <Text>Mật khẩu mới: </Text>
              <View flex={1}>
                <InputControl
                  name="newPassword"
                  placeholder=""
                  size="md"
                  variant="underlined"
                  px={2}
                  py={0}
                  rules={{
                    required: 'Mật khẩu là bắt buộc',
                    minLength: {
                      value: 8,
                      message: 'Mật khẩu tối thiểu 8 kí tự',
                    },
                  }}
                />
              </View>
            </HStack>
            <HStack alignItems="center">
              <Text>Xác nhận mật khẩu: </Text>
              <View flex={1}>
                <InputControl
                  name="confirmPassword"
                  placeholder=""
                  size="md"
                  variant="underlined"
                  px={2}
                  py={0}
                  rules={{
                    required: 'Mật khẩu là bắt buộc',
                    minLength: {
                      value: 8,
                      message: 'Mật khẩu tối thiểu 8 kí tự',
                    },
                    validate: (value: string) => {
                      if (value !== methodsPass.getValues('newPassword'))
                        return 'Mật khẩu không khớp';
                    },
                  }}
                />
              </View>
            </HStack>
            <HStack justifyContent="flex-end" space={2}>
              <CustomButton
                isLoading={isLoadingPass}
                px="4"
                title="Lưu"
                disabled={!methodsPass.formState.isValid || isLoadingPass}
                onPress={methodsPass.handleSubmit(onSubmitPass)}
                flex={1 / 3}
              />
            </HStack>
          </VStack>
        </FormProvider>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
