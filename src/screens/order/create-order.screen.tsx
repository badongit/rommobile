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
import DismissKeyboardView from 'src/components/DismissKeyboardView';

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

  function onChangeCart(id: number, change: number | string) {
    console.log('haha');

    if (typeof change === 'string' && !Number.isInteger(+change)) {
      return false;
    }
    setCarts(pre => {
      if (+change <= 0) delete pre[id];
      else pre[id] = +change > 500 ? 500 : +change;

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
              <DishCard
                key={dish.id}
                image={dish.image}
                title={dish.name}
                price={dish.price}>
                <HStack
                  alignItems="center"
                  space={3}
                  mt={6}
                  w="full"
                  justifyContent="flex-end">
                  {carts[dish.id] && (
                    <Pressable
                      onPress={() => onChangeCart(dish.id, carts[dish.id] - 1)}>
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
                    onChangeText={event => onChangeCart(dish.id, event)}
                    fontSize={14}
                    keyboardType="number-pad"
                    color="dark.50"
                    textAlign="center"
                    value={carts[dish.id]?.toString()}
                  />
                  <Pressable
                    onPress={() =>
                      onChangeCart(dish.id, (carts[dish.id] || 0) + 1)
                    }>
                    <Icon
                      color="red.500"
                      size={5}
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
      <TabView tabs={tabs} MenuView={MenuCircle} isScrollable={true} />
    </SafeAreaView>
  );
};

export default CreateOrderScreen;
