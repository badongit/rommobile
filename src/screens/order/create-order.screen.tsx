import { isEmpty } from 'lodash';
import {
  Center,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from 'src/components/Button';
import DishCard from 'src/components/DishCard';
import { SocketEventEnum } from 'src/constants/enums';
import { CREATE_ORDER_SCREEN_1 } from 'src/constants/navigate';
import {
  OrderDetailStatusEnum,
  OrderStatusEnum,
  OrderTypeEnum,
} from 'src/constants/order/enums';
import useCategory from 'src/hooks/useCategory';
import useOrder from 'src/hooks/useOrder';
import useSocket from 'src/hooks/useSocket';
import { IMenuCustomItemProps } from 'src/layouts/menu';
import DefaultMenu from 'src/layouts/menu/DefaultMenu';
import MenuCircle from 'src/layouts/menu/MenuCircle';
import CreateOrderForm from 'src/layouts/order-form/create-order-form';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';
import { IDish } from 'src/types/dish/dish.type';
import {
  ICreateOrder,
  ICreateOrderDetail,
} from 'src/types/order/create-order.type';
import { IOrderDetail } from 'src/types/order/order.type';
import { IUpdateOrderDetail } from 'src/types/order/update-order.type';
import { formatToDate } from 'src/utils/common';

export interface ICart {
  [key: string]: number;
}
const CreateOrderScreen = (props: any) => {
  const { route, navigation } = props;
  const { tableId, waitingTicket } = route.params;
  const { items: categories, dishMap } = useCategory();
  const { orderMapByTable } = useOrder();
  const { createOrder, updateOrder, changeStatusOrderDetail, socket } =
    useSocket();
  const [selectedScreen, setSelectedScreen] = useState<number>(0);
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);
  const [carts, setCarts] = useState<ICart>({});
  const [isConfirm, setIsConfirm] = useState(true);
  const order = orderMapByTable[tableId ?? waitingTicket];
  const { ...methods } = useForm<ICreateOrder>({
    mode: 'onChange',
    defaultValues: {
      customerPhoneNumber: order?.customer?.phoneNumber || '',
      customerName: order?.customer?.name || '',
      note: order?.note || '',
    },
  });

  const onChangeCarts = (id: number, change: number | string) => {
    if (typeof change === 'string' && !Number.isInteger(+change)) {
      return false;
    }
    setCarts(pre => {
      if (+change <= 0) delete pre[id];
      else pre[id] = +change > 500 ? 500 : +change;

      return Object.assign({}, pre);
    });
  };

  const onResetCarts = () => {
    setCarts({});
  };

  const toggleIsConfirm = () => {
    setIsConfirm(pre => {
      if (!Object.keys(carts).length) return false;
      return !pre;
    });
  };

  const onCreateOrder = (type: OrderTypeEnum, status: OrderStatusEnum) => {
    const details: ICreateOrderDetail[] = [];
    for (const dishId in carts) {
      details.push({
        dishId: +dishId,
        quantity: carts[dishId],
        price: dishMap[dishId].price,
      });
    }

    if (!isEmpty(details)) {
      createOrder({ type, status, tableId, details, waitingTicket });
      setCarts({});
    }
  };

  const onUpdateOrder = (data?: ICreateOrder) => {
    const details: IUpdateOrderDetail[] = [];

    for (const dishId in carts) {
      details.push({
        dishId: +dishId,
        quantity: carts[dishId],
        price: dishMap[dishId].price,
      });
    }

    if (order) {
      order.details.forEach(detail => {
        details.push({
          id: detail.id,
          dishId: detail.dishId,
          quantity: detail.quantity,
          price: detail.price,
        });
      });
      updateOrder({ ...data, id: order.id, details: details });
      setCarts({});
    }
  };

  function onChangeStatusOrderDetail(
    id: number,
    status: OrderDetailStatusEnum,
  ) {
    changeStatusOrderDetail({ id, status });
  }

  const menuItems: IMenuCustomItemProps[] = [
    {
      title: 'Thực đơn',
      onPress: () => {
        setSelectedScreen(0);
      },
    },
    {
      title: 'Đơn hàng',
      onPress: () => {
        setSelectedScreen(1);
      },
    },
  ];

  useEffect(() => {
    if (!Object.keys(carts).length) {
      setIsConfirm(false);
    }
  }, [carts]);

  function renderControlDishQuantity(dishId: number): JSX.Element {
    return (
      <HStack alignItems="center" space={3} w="full" justifyContent="flex-end">
        {carts[dishId] && (
          <Pressable onPress={() => onChangeCarts(dishId, carts[dishId] - 1)}>
            <Icon
              color="red.500"
              size={5}
              as={<AntDesign name="minuscircleo" />}
            />
          </Pressable>
        )}
        <Input
          size="xs"
          w="52px"
          variant="filled"
          onChangeText={event => onChangeCarts(dishId, event)}
          fontSize={14}
          keyboardType="number-pad"
          color="dark.50"
          textAlign="center"
          value={carts[dishId]?.toString()}
        />
        <Pressable
          onPress={() => onChangeCarts(dishId, (carts[dishId] || 0) + 1)}>
          <Icon
            color="red.500"
            size={5}
            as={<AntDesign name="pluscircleo" />}
          />
        </Pressable>
      </HStack>
    );
  }

  function renderTabElement(dishes: IDish[]): JSX.Element {
    return (
      <ScrollView>
        <VStack px={3} py={3} space={4} alignItems="flex-end">
          {dishes.map(dish => {
            return (
              <DishCard
                key={dish.id}
                image={dish.image}
                title={dish.name}
                price={dish.price}>
                {renderControlDishQuantity(dish.id)}
              </DishCard>
            );
          })}
        </VStack>
      </ScrollView>
    );
  }

  useEffect(() => {
    setTabs([
      ...categories.map(item => ({
        title: item.name,
        image: item.image,
        element: renderTabElement(item.dishes),
      })),
    ]);
  }, [categories, carts]);

  useEffect(() => {
    const navigateScreen = (data: any) => {
      if (data.navigate === CREATE_ORDER_SCREEN_1) {
        setSelectedScreen(1);
      }
    };

    socket?.on(SocketEventEnum.NOTIFICATION, navigateScreen);

    return () => {
      socket?.off(SocketEventEnum.NOTIFICATION, navigateScreen);
    };
  }, [navigation, socket]);

  return (
    <View flex={1}>
      <DefaultMenu items={menuItems} selected={selectedScreen} />
      {selectedScreen === 0 ? (
        <View flex={1}>
          <TabView tabs={tabs} MenuView={MenuCircle} isScrollable={true} />
          {!!Object.keys(carts).length && (
            <View
              position="absolute"
              bottom="0"
              w="full"
              backgroundColor="error.500"
              zIndex="10000">
              <HStack justifyContent="space-between">
                <Pressable
                  flexBasis="20%"
                  py={4}
                  borderRightWidth="1"
                  borderRightColor="light.50"
                  onPress={toggleIsConfirm}>
                  <Center>
                    <Icon
                      color="light.50"
                      size={6}
                      as={<Feather name="shopping-cart" />}
                    />
                    {!!Object.keys(carts).length && (
                      <Center
                        position="absolute"
                        top="-8px"
                        right="10px"
                        w="4"
                        h="4"
                        borderRadius="full"
                        backgroundColor="light.50">
                        <Text
                          color="error.500"
                          fontSize="10"
                          fontWeight="semibold">
                          {Object.keys(carts).length}
                        </Text>
                      </Center>
                    )}
                  </Center>
                </Pressable>
                {!order && !waitingTicket && (
                  <Pressable
                    flexBasis="40%"
                    py={4}
                    onPress={() =>
                      onCreateOrder(
                        OrderTypeEnum.IN_HERE,
                        OrderStatusEnum.WAIT_CONFIRM,
                      )
                    }>
                    <Text
                      color="light.50"
                      textAlign="center"
                      fontWeight="semibold">
                      Đặt bàn
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  flexBasis="40%"
                  py={4}
                  borderLeftWidth="1"
                  borderLeftColor="light.50"
                  onPress={
                    order
                      ? () => onUpdateOrder()
                      : () =>
                          onCreateOrder(
                            waitingTicket
                              ? OrderTypeEnum.BRING_BACK
                              : OrderTypeEnum.IN_HERE,
                            OrderStatusEnum.IN_PROGRESS,
                          )
                  }>
                  <Text
                    color="light.50"
                    textAlign="center"
                    fontWeight="semibold">
                    Xác nhận
                  </Text>
                </Pressable>
              </HStack>
            </View>
          )}
          {isConfirm && (
            <Pressable
              onPress={toggleIsConfirm}
              position="absolute"
              h="full"
              w="full"
              top="0"
              left="0"
              right="0"
              bottom="0"
              zIndex="100"
              opacity={30}
              backgroundColor="dark.50"
            />
          )}
          {isConfirm && (
            <View
              position="absolute"
              w="full"
              left="0"
              bottom="12"
              zIndex="100"
              backgroundColor="white"
              p="3">
              <ScrollView>
                <HStack w="full" justifyContent="space-between">
                  <Pressable onPress={toggleIsConfirm}>
                    <Text color="lightBlue.500" fontSize="15">
                      <Icon
                        color="lightBlue.500"
                        as={<AntDesign name="close" />}
                      />
                      Đóng
                    </Text>
                  </Pressable>
                  <Pressable onPress={onResetCarts}>
                    <Text color="lightBlue.500" fontSize="15">
                      <Icon
                        color="lightBlue.500"
                        as={<Ionicons name="trash-outline" />}
                      />
                      Xóa
                    </Text>
                  </Pressable>
                </HStack>
                <View
                  w="full"
                  h="1px"
                  borderRadius="1px"
                  backgroundColor="muted.500"
                  mt={2}
                  opacity={20}></View>
                {Object.keys(carts).map(dishId => {
                  const dish = dishMap[dishId];
                  return (
                    <View w="full" key={dishId} mt={2}>
                      <Text isTruncated={true}>{dish.name}</Text>
                      {renderControlDishQuantity(dish.id)}
                      <View
                        w="full"
                        h="1px"
                        borderRadius="1px"
                        backgroundColor="muted.500"
                        mt={2}
                        opacity={20}></View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      ) : (
        <ScrollView>
          <View p={4}>
            <CreateOrderForm
              methods={methods}
              order={order}
              tableId={tableId}
              waitingTicket={waitingTicket}
              onSubmit={onUpdateOrder}
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
      )}
    </View>
  );
};

export default CreateOrderScreen;
