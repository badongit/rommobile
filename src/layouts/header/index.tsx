import { getHeaderTitle } from '@react-navigation/elements';
import { HStack, Icon, Image, Pressable, Text, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DASHBOARD_SCREEN, LOGIN_SCREEN } from 'src/constants/navigate';
import { useAuth } from 'src/hooks/useAuth';
import useCategory from 'src/hooks/useCategory';
import useFloor from 'src/hooks/useFloor';
import useOrder from 'src/hooks/useOrder';
const logoImg = require('src/assets/images/logo-white.png');

const MyHeader = (props: any) => {
  const { navigation, route, options, back } = props;
  const title = getHeaderTitle(options, 'default');
  const { actions: authActions } = useAuth();
  const { actions: orderActions } = useOrder();
  const { actions: categoryActions } = useCategory();
  const { actions: floorActions } = useFloor();

  return (
    <View w="full" backgroundColor="red.600">
      <HStack justifyContent="space-between" alignItems="center">
        {route.name === DASHBOARD_SCREEN ? (
          <Pressable
            onPress={() => {
              navigation.navigate(DASHBOARD_SCREEN);
            }}
            px="4"
            py="4">
            <Icon color="light.50" size={6} as={<AntDesign name="home" />} />
          </Pressable>
        ) : (
          <Pressable onPress={back ? navigation.goBack : null} px="4" py="4">
            <Icon color="light.50" size={6} as={<AntDesign name="left" />} />
          </Pressable>
        )}
        {title !== 'default' ? (
          <Text
            textAlign="center"
            color="light.50"
            fontSize="16"
            fontWeight="bold">
            {title}
          </Text>
        ) : (
          <Image source={logoImg} w="50px" h="50px" alt="logo" />
        )}
        {route.name === DASHBOARD_SCREEN ? (
          <Pressable
            onPress={() => {
              authActions.logout(() => {
                navigation.navigate(LOGIN_SCREEN);
                orderActions.reset();
                categoryActions.reset();
                floorActions.reset();
              });
            }}
            px="4"
            py="4">
            <Icon color="light.50" size={6} as={<AntDesign name="logout" />} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate(DASHBOARD_SCREEN);
            }}
            px="4"
            py="4">
            <Icon color="light.50" size={6} as={<AntDesign name="home" />} />
          </Pressable>
        )}
      </HStack>
    </View>
  );
};

export default MyHeader;
