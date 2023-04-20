import { HStack, ScrollView, Text, VStack, View } from 'native-base';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from 'src/components/Button';
import DishCard from 'src/components/DishCard';
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
  const { route } = props;
  const { tableId } = route.params;
  const { dishMap } = useCategory();
  const { changeStatusOrderDetail } = useSocket();
  const { orderMapByTable } = useOrder();
  const order = orderMapByTable[tableId];
  const { userInfo } = useAuth();
  const { ...methods } = useForm<ICompleteOrder>({
    mode: 'onChange',
    defaultValues: {
      customerPhoneNumber: order?.customer?.phoneNumber || '',
      customerName: order?.customer?.name || '',
      note: order?.note || '',
      paymentMethod: PaymentMethodEnum.CASH,
      pointUsed: 0,
      cashierId: userInfo.id,
    },
  });

  function onCompleteOrder(data: any) {
    console.log(
      '🚀 ~ file: complete-order.screen.tsx:29 ~ onCompleteOrder ~ data:',
      data,
    );
  }

  function onChangeStatusOrderDetail(
    id: number,
    status: OrderDetailStatusEnum,
  ) {
    changeStatusOrderDetail({ id, status });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View p={4}>
          <PaymentOrderForm
            methods={methods}
            order={order}
            tableId={tableId}
            onSubmit={onCompleteOrder}
          />
        </View>
        {order && (
          <View p={4}>
            <View backgroundColor="white" borderRadius="lg" p={4}>
              <VStack space={4}>
                {order.details.map(
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
