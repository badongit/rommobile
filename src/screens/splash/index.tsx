import { Center, Image, Spinner } from 'native-base';
import { useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import { DASHBOARD_SCREEN, LOGIN_SCREEN } from 'src/constants/navigate';
import { useAuth } from 'src/hooks/useAuth';
import useCategory from 'src/hooks/useCategory';
import useFloor from 'src/hooks/useFloor';
import useOrder from 'src/hooks/useOrder';
const logoImg = require('src/assets/images/logo.png');

const SplashScreen = (props: any) => {
  const { navigation } = props;
  const { actions: authActions, userInfo } = useAuth();
  const { actions: floorActions, items: floors } = useFloor();
  const { actions: categoryActions, items: categories } = useCategory();
  const { actions: orderActions } = useOrder();

  useEffect(() => {
    if (!userInfo.id) {
      authActions.getMe(null, () => {
        navigation.navigate(LOGIN_SCREEN);
      });
    }
  }, []);

  useEffect(() => {
    if (userInfo.id) {
      floorActions.getList(null, (error: any) => {
        showMessage({
          message: error?.message || 'Đã có lỗi xảy ra',

          type: 'danger',
        });
      });
    }
  }, [userInfo.id]);

  useEffect(() => {
    if (floors.length) {
      categoryActions.getList(null, (error: any) => {
        showMessage({
          message: error?.message || 'Đã có lỗi xảy ra',

          type: 'danger',
        });
      });
    }
  }, [floors.length]);

  useEffect(() => {
    if (categories.length) {
      orderActions.getList(
        () => {
          navigation.navigate(DASHBOARD_SCREEN);
        },
        (error: any) => {
          showMessage({
            message: error?.message || 'Đã có lỗi xảy ra',
            type: 'danger',
          });
        },
      );
    }
  }, [categories.length]);

  return (
    <Center flex={1} backgroundColor="white">
      <Image source={logoImg} w="200px" h="200px" alt="Logo" />
      <Spinner color="error.500" size="lg" />
    </Center>
  );
};

export default SplashScreen;
