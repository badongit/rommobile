import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COMPLETE_ORDER_SCREEN } from 'src/constants/navigate';
import { TableStatusEnum } from 'src/constants/table/enums';
import useFloor from 'src/hooks/useFloor';
import TabTables from 'src/layouts/tab-tables';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';
import TabWaitTicket from 'src/layouts/tab-wait-ticket';
import { ITable } from 'src/types/table/table.type';

const PaymentScreen = (props: any) => {
  const { navigation } = props;
  const { items: floors } = useFloor();
  const firstTab = {
    title: 'Mang về',
    element: (
      <TabWaitTicket
        key={0}
        navigation={navigation}
        isPayment={true}
        onPressItem={(waitingTicket: string) => {
          navigation.navigate(COMPLETE_ORDER_SCREEN, { waitingTicket });
        }}
      />
    ),
  };
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);

  useEffect(() => {
    setTabs([
      firstTab,
      ...floors.map(floor => ({
        title: floor.name,
        element: (
          <TabTables
            tables={floor.tables}
            key={floor.id}
            navigation={navigation}
            onPressTable={(table: ITable) => {
              if (
                ![TableStatusEnum.OFF, TableStatusEnum.EMPTY].includes(
                  table.status,
                )
              ) {
                navigation.navigate(COMPLETE_ORDER_SCREEN, {
                  tableId: table.id,
                });
              }
            }}
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

export default PaymentScreen;
