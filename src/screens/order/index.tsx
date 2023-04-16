import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFloor from 'src/hooks/useFloor';
import TabTables from 'src/layouts/tab-tables';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';

const OrderScreen = (props: any) => {
  const { navigation } = props;
  const { items: floors } = useFloor();
  // const firstTab = {
  //   title: 'Mang về',
  //   element: <TabTables tables={items[0].tables} key={0} />,
  // };
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);

  useEffect(() => {
    setTabs([
      // firstTab,
      ...floors.map(floor => ({
        title: floor.name,
        element: (
          <TabTables
            tables={floor.tables}
            key={floor.id}
            navigation={navigation}
          />
        ),
      })),
    ]);
  }, [floors]);

  return (
    <SafeAreaView>
      <TabView tabs={tabs} isScrollable={true} />
    </SafeAreaView>
  );
};

export default OrderScreen;
