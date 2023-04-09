import { HStack, Pressable, ScrollView, Text, View } from 'native-base';
import { IMenuCustomItemProps, IMenuCustomProps } from '.';

const DefaultMenu = (props: IMenuCustomProps) => {
  const { items, selectedColor, selected, isScrollable } = props;

  function render() {
    return (
      <HStack w="full">
        {items.map((item: IMenuCustomItemProps, index: number) => {
          const { title, onPress } = item;
          const color = item.selectedColor || selectedColor || 'red.500';
          return (
            <Pressable flex={1} key={index} onPress={onPress}>
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
                <View
                  w="100%"
                  h="1"
                  borderRadius="2px"
                  backgroundColor={color}
                />
              )}
            </Pressable>
          );
        })}
      </HStack>
    );
  }

  return isScrollable ? (
    <ScrollView horizontal>{render()}</ScrollView>
  ) : (
    render()
  );
};

export default DefaultMenu;
