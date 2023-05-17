import { Box, HStack, ScrollView, View, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuCard, { IMenuCardProps } from 'src/components/MenuCard';
import {
  INTRO_SCREEN,
  ORDER_SCREEN,
  PAYMENT_SCREEN,
  PERFORM_SCREEN,
  PROFILE_SCREEN,
} from 'src/constants/navigate';

const DashboardScreen = (props: any) => {
  const { navigation } = props;
  const menu: IMenuCardProps[] = [
    {
      backgroundIcon: 'red.600',
      IconElement: <MaterialIcons name="ramen-dining" />,
      onPress: () => {
        navigation.navigate(ORDER_SCREEN);
      },
      title: 'Gọi món',
    },
    {
      backgroundIcon: 'orange.600',
      IconElement: <MaterialIcons name="restaurant-menu" />,
      onPress: () => {
        navigation.navigate(PERFORM_SCREEN);
      },
      title: 'Thực hiện',
    },
    {
      backgroundIcon: 'green.600',
      IconElement: <AntDesign name="creditcard" />,
      onPress: () => {
        navigation.navigate(PAYMENT_SCREEN);
      },
      title: 'Thanh toán',
    },
    {
      backgroundIcon: 'coolGray.600',
      IconElement: <Ionicons name="md-settings-outline" />,
      onPress: () => {
        navigation.navigate(PROFILE_SCREEN);
      },
      title: 'Cài đặt',
    },
  ];

  return (
    <SafeAreaView>
      <View backgroundColor="light.200" h="full">
        <ScrollView>
          <HStack flexWrap="wrap" justifyContent={'center'}>
            <VStack flexBasis="45%">
              {menu.map((props, index) => {
                if (index % 2 !== 0) {
                  return null;
                }

                return (
                  <Box m="3" maxW={64} key={index}>
                    <MenuCard {...props} />
                  </Box>
                );
              })}
            </VStack>
            <VStack flexBasis="45%">
              {menu.map((props, index) => {
                if (index % 2 === 0) {
                  return null;
                }
                return (
                  <Box m="3" maxW={64} key={index}>
                    <MenuCard {...props} />
                  </Box>
                );
              })}
            </VStack>
          </HStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
