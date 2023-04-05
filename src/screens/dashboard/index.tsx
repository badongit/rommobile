import {
  Box,
  Center,
  HStack,
  ScrollView,
  Stack,
  View,
  VStack,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuCard, { IMenuCardProps } from 'src/components/MenuCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { INTRO_SCREEN } from 'src/constants/navigate';

const DashboardScreen = (props: any) => {
  const { navigation } = props;
  const menu: IMenuCardProps[] = [
    {
      backgroundIcon: 'red.600',
      IconElement: <MaterialIcons name="ramen-dining" />,
      onPress: () => {
        navigation.navigate(INTRO_SCREEN);
      },
      title: 'Gọi món',
    },
    {
      backgroundIcon: 'orange.600',
      IconElement: <MaterialIcons name="restaurant-menu" />,
      onPress: () => {
        navigation.navigate(INTRO_SCREEN);
      },
      title: 'Thực hiện',
    },
    {
      backgroundIcon: 'green.600',
      IconElement: <AntDesign name="creditcard" />,
      onPress: () => {
        navigation.navigate(INTRO_SCREEN);
      },
      title: 'Thanh toán',
    },
    {
      backgroundIcon: 'coolGray.600',
      IconElement: <Ionicons name="md-settings-outline" />,
      onPress: () => {
        navigation.navigate(INTRO_SCREEN);
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
