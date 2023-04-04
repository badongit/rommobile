import { Box, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuCard, { IMenuCardProps } from 'src/components/MenuCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { INTRO_SCREEN } from 'src/constants/navigate';

const DashboardScreen = (props: any) => {
  const menu: IMenuCardProps[] = [];
  const { navigation } = props;

  return (
    <SafeAreaView>
      <View backgroundColor="light.200">
        <Box flex="1">
          <MenuCard
            backgroundIcon="red.600"
            IconElement={<AntDesign name="user" size={24} color="white" />}
            title="Gọi món"
            onPress={() => {
              navigation.nagivate(INTRO_SCREEN);
            }}
          />
        </Box>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
