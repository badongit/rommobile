import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFloor from 'src/hooks/useFloor';
import TabTables from 'src/layouts/tab-tables';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';

const OrderScreen = (props: any) => {
  const { actions, items } = useFloor();
  // const firstTab = {
  //   title: 'Mang về',
  //   element: <TabTables tables={items[0].tables} key={0} />,
  // };
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);

  useEffect(() => {
    actions.getList();
  }, []);

  useEffect(() => {
    setTabs([
      // firstTab,
      ...items.map(item => ({
        title: item.name,
        element: <TabTables tables={item.tables} key={item.id} />,
      })),
    ]);
  }, [items]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <SafeAreaView>
      <TabView tabs={tabs} isScrollable={true} />
    </SafeAreaView>
  );
};

export default OrderScreen;
