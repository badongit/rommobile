import { HStack, ScrollView, Text, View, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from 'src/components/Button';
import DishCard from 'src/components/DishCard';
import { SocketEventEnum } from 'src/constants/enums';
import { PAYMENT_SCREEN } from 'src/constants/navigate';
import {
  OrderDetailStatusEnum,
  PaymentMethodEnum,
} from 'src/constants/order/enums';
import { useAuth } from 'src/hooks/useAuth';
import useCategory from 'src/hooks/useCategory';
import useOrder from 'src/hooks/useOrder';
import useSocket from 'src/hooks/useSocket';
import PaymentOrderForm from 'src/layouts/order-form/payment-order-form';
import { ICompleteOrder } from 'src/types/order/complete-order.type';
import { IOrderDetail } from 'src/types/order/order.type';
import { formatToDate } from 'src/utils/common';

const CompleteOrderScreen = (props: any) => {
  const { route, navigation } = props;
  const { tableId, waitingTicket } = route.params;
  const { dishMap } = useCategory();
  const {
    changeStatusOrderDetail,
    completeOrder,
    socket,
    confirmOrder,
    cancelOrder,
  } = useSocket();
  const { orderMapByTable } = useOrder();
  const order = orderMapByTable[tableId ?? waitingTicket];
  const { userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { ...methods } = useForm<ICompleteOrder>({
    mode: 'onChange',
    defaultValues: {
      id: order?.id,
      customerPhoneNumber: order?.customer?.phoneNumber || '',
      customerName: order?.customer?.name || '',
      note: order?.note || '',
      paymentMethod: PaymentMethodEnum.CASH,
      pointUsed: '0',
      cashierId: userInfo?.id,
    },
  });

  function onCompleteOrder() {
    setIsLoading(true);
    completeOrder(methods.getValues());
  }

  function onChangeStatusOrderDetail(
    id: number,
    status: OrderDetailStatusEnum,
  ) {
    changeStatusOrderDetail({ id, status });
  }

  function onConfirmOrder() {
    setIsLoading(true);
    confirmOrder({ id: order?.id });
  }

  function onCancelOrder() {
    setIsLoading(true);
    cancelOrder({ id: order?.id });
  }

  useEffect(() => {
    const navigateScreen = (data: any) => {
      setIsLoading(false);
      if (data.navigate) {
        navigation.navigate(data.navigate);
      }
    };
    const handleError = () => {
      setIsLoading(false);
    };
    socket?.on(SocketEventEnum.NOTIFICATION, navigateScreen);
    socket?.on(SocketEventEnum.ERROR, handleError);

    return () => {
      socket?.off(SocketEventEnum.NOTIFICATION, navigateScreen);
      socket?.off(SocketEventEnum.ERROR, handleError);
    };
  }, [navigation, socket]);

  useEffect(() => {
    if (!order) {
      navigation.navigate(PAYMENT_SCREEN);
    }
  }, [order]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View p={4}>
          <PaymentOrderForm
            methods={methods}
            order={order}
            tableId={tableId}
            isSubmitting={isLoading}
            onComplete={onCompleteOrder}
            onConfirm={onConfirmOrder}
            onCancel={onCancelOrder}
          />
        </View>
        {order && (
          <View p={4}>
            <View backgroundColor="white" borderRadius="lg" p={4}>
              <VStack space={4}>
                {order?.details.map(
                  (detail, index: number, details: IOrderDetail[]) => {
                    const dish = dishMap[detail.dishId];
                    const topComponent =
                      detail.createdAt !== details[index - 1]?.createdAt ? (
                        <Text>
                          Thời gian gọi món: {formatToDate(detail.createdAt)}
                        </Text>
                      ) : null;
                    return (
                      <DishCard
                        key={detail.id}
                        image={dish.image}
                        title={dish.name}
                        price={dish.price}
                        topComponent={topComponent}
                        quantity={detail.quantity}
                        status={detail.status}
                        imageSize={75}>
                        {detail.status ===
                          OrderDetailStatusEnum.WAIT_CONFIRM && (
                          <HStack justifyContent="flex-end">
                            <Button
                              onPress={() =>
                                onChangeStatusOrderDetail(
                                  detail.id,
                                  OrderDetailStatusEnum.CANCEL,
                                )
                              }
                              title="Huỷ"
                              py={1}
                              flex={1 / 3}
                              my={1.5}
                            />
                          </HStack>
                        )}
                      </DishCard>
                    );
                  },
                )}
              </VStack>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteOrderScreen;
