import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DishCard, { IDishCardProps } from 'src/components/DishCard';
import useCategory from 'src/hooks/useCategory';
import { IMenuCustomItemProps } from 'src/layouts/menu';
import DefaultMenu from 'src/layouts/menu/DefaultMenu';
import MenuCircle from 'src/layouts/menu/MenuCircle';
import TabView, { ITabViewItem } from 'src/layouts/tab-view';
import { IDish } from 'src/types/dish/dish.type';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface ICart {
  [key: string]: number;
}
const CreateOrderScreen = (props: any) => {
  const [selectedScreen, setSelectedScreen] = useState<number>(0);
  const { items, actions } = useCategory();
  const [tabs, setTabs] = useState<ITabViewItem[]>([]);
  const [carts, setCarts] = useState<ICart>({});

  useEffect(() => {
    actions.getList();
  }, []);

  function onChangeCart(id: number, change: number) {
    console.log('haha');

    setCarts(pre => {
      if (change <= 0) delete pre[id];
      else pre[id] = change;

      return Object.assign({}, pre);
    });
  }

  useEffect(() => {
    console.log('carts: ', carts);
  }, [carts]);

  function renderTabElement(dishes: IDish[]) {
    return (
      <ScrollView>
        <VStack px={3} space={4} alignItems="flex-end">
          {dishes.map(dish => {
            return (
              <DishCard key={dish.id} image={dish.image} title={dish.name}>
                <HStack alignItems="center" space={3} mt={6}>
                  {carts[dish.id] && (
                    <Pressable
                      onPress={() => onChangeCart(dish.id, carts[dish.id] - 1)}>
                      <Icon
                        color="red.500"
                        size={6}
                        as={<AntDesign name="minuscircleo" />}
                      />
                    </Pressable>
                  )}
                  {carts[dish.id] && (
                    <Input
                      size="xs"
                      w="12"
                      variant="filled"
                      onChangeText={event => onChangeCart(dish.id, +event)}
                      fontSize={14}
                      color="dark.50"
                      textAlign="center"
                      value={carts[dish.id].toString()}
                    />
                  )}
                  <Pressable
                    onPress={() =>
                      onChangeCart(dish.id, (carts[dish.id] || 0) + 1)
                    }>
                    <Icon
                      color="red.500"
                      size={6}
                      as={<AntDesign name="pluscircleo" />}
                    />
                  </Pressable>
                </HStack>
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

  return (
    <SafeAreaView>
      <DefaultMenu items={menuItems} selected={selectedScreen} />
      <TabView tabs={tabs} MenuView={MenuCircle} />
    </SafeAreaView>
  );
};

export default CreateOrderScreen;
