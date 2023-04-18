import { Text } from 'native-base';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useOrder from 'src/hooks/useOrder';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';

const PerformScreen = (props: any) => {
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);
  const { orderDetails } = useOrder();

  useEffect(() => {
    setTabs([
      {
        title: 'Xác nhận',
        element: <Text>Chờ xác nhận</Text>,
      },
      {
        title: 'Thực hiện',
        element: <Text>Đang thực hiện</Text>,
      },
      {
        title: 'Hoàn thành',
        element: <Text>Chờ xác nhận</Text>,
      },
    ]);
  }, [orderDetails]);
  return (
    <SafeAreaView>
      <TabView tabs={tabs} isScrollable={false} />
    </SafeAreaView>
  );
};

export default PerformScreen;
