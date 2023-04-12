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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DishCard from 'src/components/DishCard';
import useCategory from 'src/hooks/useCategory';
import { IMenuCustomItemProps } from 'src/layouts/menu';
import DefaultMenu from 'src/layouts/menu/DefaultMenu';
import MenuCircle from 'src/layouts/menu/MenuCircle';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';
import { IDish } from 'src/types/dish/dish.type';

export interface ICart {
  [key: string]: number;
}
const CreateOrderScreen = (props: any) => {
  const [selectedScreen, setSelectedScreen] = useState<number>(0);
  const { items, actions, dishMap } = useCategory();
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);
  const [carts, setCarts] = useState<ICart>({});
  const [isConfirm, setIsConfirm] = useState(true);

  useEffect(() => {
    actions.getList();
  }, []);

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

  function renderControlDish(dishId: number): JSX.Element {
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
        <VStack px={3} space={4} alignItems="flex-end">
          {dishes.map(dish => {
            return (
              <DishCard
                key={dish.id}
                image={dish.image}
                title={dish.name}
                price={dish.price}>
                {renderControlDish(dish.id)}
              </DishCard>
            );
          })}
        </VStack>
      </ScrollView>
    );
  }

  useEffect(() => {
    setTabs([
      ...items.map(item => ({
        title: item.name,
        image: item.image,
        element: renderTabElement(item.dishes),
      })),
    ]);
  }, [items, carts]);

  return (
    <View flex={1}>
      <DefaultMenu items={menuItems} selected={selectedScreen} />
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
              <Pressable flexBasis="40%" py={4}>
                <Text color="light.50" textAlign="center" fontWeight="semibold">
                  Đặt bàn
                </Text>
              </Pressable>
              <Pressable
                flexBasis="40%"
                py={4}
                borderLeftWidth="1"
                borderLeftColor="light.50">
                <Text color="light.50" textAlign="center" fontWeight="semibold">
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
                    {renderControlDish(dish.id)}
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
    </View>
  );
};

export default CreateOrderScreen;
