import { groupBy } from 'lodash';
import { HStack, ScrollView, Text, VStack, View } from 'native-base';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from 'src/components/Button';
import DishCard from 'src/components/DishCard';

import { OrderDetailStatusEnum } from 'src/constants/order/enums';
import useCategory from 'src/hooks/useCategory';
import useFloor from 'src/hooks/useFloor';
import useOrder from 'src/hooks/useOrder';
import useSocket from 'src/hooks/useSocket';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';
import { IOrderDetail } from 'src/types/order/order.type';

const PerformScreen = (props: any) => {
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);
  const { orderDetails, orderMap } = useOrder();
  const { tableMap } = useFloor();
  const { dishMap } = useCategory();
  const { changeStatusOrderDetail } = useSocket();

  const onChangeStatusOrderDetail = (
    id: number,
    status: OrderDetailStatusEnum,
  ) => {
    changeStatusOrderDetail({ id, status });
  };

  function renderTabs(details: IOrderDetail[]) {
    return (
      <ScrollView>
        <VStack space={4} p={4} flex={1}>
          {details.map(detail => {
            const dish = dishMap[detail.dishId];
            const order = orderMap[detail.orderId];
            const tableCode = tableMap[order.tableId]?.code;
            const waitingTicket = order.waitingTicket;

            return (
              <DishCard
                key={detail.id}
                title={dish.name}
                image={dish.image}
                quantity={detail.quantity}
                imageSize={75}
                tableCode={tableCode}
                waitingTicket={waitingTicket}>
                <HStack justifyContent="flex-end" space={4} mt="2">
                  {detail.status === OrderDetailStatusEnum.WAIT_CONFIRM && (
                    <Button
                      title="Hủy"
                      backgroundColor="red.600"
                      onPress={() =>
                        onChangeStatusOrderDetail(
                          detail.id,
                          OrderDetailStatusEnum.CANCEL,
                        )
                      }
                      flex={1 / 3}
                      py={2}
                    />
                  )}
                  {detail.status === OrderDetailStatusEnum.WAIT_CONFIRM && (
                    <Button
                      title="Xác nhận"
                      backgroundColor="success.600"
                      onPress={() =>
                        onChangeStatusOrderDetail(
                          detail.id,
                          OrderDetailStatusEnum.IN_PROGRESS,
                        )
                      }
                      flex={1 / 3}
                      py={2}
                    />
                  )}
                  {detail.status === OrderDetailStatusEnum.IN_PROGRESS && (
                    <Button
                      title="Hoàn thành"
                      backgroundColor="success.600"
                      onPress={() =>
                        onChangeStatusOrderDetail(
                          detail.id,
                          OrderDetailStatusEnum.COMPLETED,
                        )
                      }
                    />
                  )}
                </HStack>
              </DishCard>
            );
          })}
        </VStack>
      </ScrollView>
    );
  }

  useEffect(() => {
    const orderDetailGroupStatus = groupBy(orderDetails, 'status');

    setTabs([
      {
        title: 'Xác nhận',
        element: renderTabs(
          orderDetailGroupStatus[OrderDetailStatusEnum.WAIT_CONFIRM] ?? [],
        ),
      },
      {
        title: 'Thực hiện',
        element: renderTabs(
          orderDetailGroupStatus[OrderDetailStatusEnum.IN_PROGRESS] ?? [],
        ),
      },
      {
        title: 'Hoàn thành',
        element: renderTabs(
          orderDetailGroupStatus[OrderDetailStatusEnum.COMPLETED] ?? [],
        ),
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
