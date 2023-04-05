import { SafeAreaView } from 'react-native-safe-area-context';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';

const OrderScreen = (props: any) => {
  const tabs: ITabViewItem[] = [
    {
      title: 'Mang về',
    },
    {
      title: 'Tầng 1',
    },
    {
      title: 'Tầng 2',
    },
    {
      title: 'Tầng 3',
    },
    {
      title: 'Mang về',
    },
    {
      title: 'Tầng 1',
    },
    {
      title: 'Tầng 2',
    },
    {
      title: 'Tầng 3',
    },
  ];
  return (
    <SafeAreaView>
      <TabView tabs={tabs} />
    </SafeAreaView>
  );
};

export default OrderScreen;
