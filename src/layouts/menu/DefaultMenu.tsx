import { HStack, Pressable, ScrollView, Text, View } from 'native-base';
import { MutableRefObject, useRef } from 'react';
import { Dimensions } from 'react-native';
import { IMenuCustomItemProps, IMenuCustomProps } from '.';
const widthScreen = Dimensions.get('screen').width;

const DefaultMenu = (props: IMenuCustomProps) => {
  const { items, selectedColor, selected } = props;

  return (
    <HStack w="full">
      {items.map((item: IMenuCustomItemProps, index: number) => {
        const { title, onPress } = item;
        const color = item.selectedColor || selectedColor || 'red.500';
        return (
          <Pressable flex={1} key={index} onPress={() => onPress(index)}>
            <Text
              fontSize="md"
              fontWeight="semibold"
              px={4}
              py={2}
              textAlign="center"
              color={selected === index ? color : 'dark.50'}>
              {title}
            </Text>
            {selected === index && (
              <View w="100%" h="1" borderRadius="2px" backgroundColor={color} />
            )}
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default DefaultMenu;
