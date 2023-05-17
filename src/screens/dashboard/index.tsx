import { Box, HStack, ScrollView, View, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuCard, { IMenuCardProps } from 'src/components/MenuCard';
import { RoleEnum } from 'src/constants/enums';
import {
  ORDER_SCREEN,
  PAYMENT_SCREEN,
  PERFORM_SCREEN,
  PROFILE_SCREEN,
} from 'src/constants/navigate';
import { useAuth } from 'src/hooks/useAuth';

const DashboardScreen = (props: any) => {
  const { navigation } = props;
  const { userInfo } = useAuth();
  const menu: IMenuCardProps[] = [
    {
      backgroundIcon: 'red.600',
      IconElement: <MaterialIcons name="ramen-dining" />,
      onPress: () => {
        navigation.navigate(ORDER_SCREEN);
      },
      title: 'Gọi món',
      roleAllow: [
        RoleEnum.MANAGER,
        RoleEnum.ADMIN,
        RoleEnum.WAITER,
        RoleEnum.CASHIER,
      ],
    },
    {
      backgroundIcon: 'orange.600',
      IconElement: <MaterialIcons name="restaurant-menu" />,
      onPress: () => {
        navigation.navigate(PERFORM_SCREEN);
      },
      title: 'Thực hiện',
      roleAllow: [RoleEnum.MANAGER, RoleEnum.ADMIN, RoleEnum.COOK],
    },
    {
      backgroundIcon: 'green.600',
      IconElement: <AntDesign name="creditcard" />,
      onPress: () => {
        navigation.navigate(PAYMENT_SCREEN);
      },
      title: 'Thanh toán',
      roleAllow: [RoleEnum.MANAGER, RoleEnum.ADMIN, RoleEnum.CASHIER],
    },
    {
      backgroundIcon: 'coolGray.600',
      IconElement: <Ionicons name="md-settings-outline" />,
      onPress: () => {
        navigation.navigate(PROFILE_SCREEN);
      },
      title: 'Cài đặt',
      roleAllow: [
        RoleEnum.MANAGER,
        RoleEnum.ADMIN,
        RoleEnum.WAITER,
        RoleEnum.CASHIER,
        RoleEnum.COOK,
      ],
    },
  ];

  const renderMenu = (isEven: boolean) => {
    let i = -1;

    return menu.map((props, index) => {
      if (props.roleAllow && props.roleAllow.includes(userInfo?.role?.code)) {
        i++;

        if (i % 2 === 0) {
          return isEven ? (
            <Box m="3" maxW={64} key={index}>
              <MenuCard {...props} />
            </Box>
          ) : null;
        } else {
          return isEven ? null : (
            <Box m="3" maxW={64} key={index}>
              <MenuCard {...props} />
            </Box>
          );
        }
      }

      return null;
    });
  };

  return (
    <SafeAreaView>
      <View backgroundColor="light.200" h="full">
        <ScrollView>
          <HStack flexWrap="wrap" justifyContent={'center'}>
            <VStack flexBasis="45%">{renderMenu(true)}</VStack>
            <VStack flexBasis="45%">{renderMenu(false)}</VStack>
          </HStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
