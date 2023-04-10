import { HStack, ScrollView } from 'native-base';
import ButtonCircle from 'src/components/ButtonCircle';
import { IMenuCustomProps } from '.';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
const widthScreen = Dimensions.get('screen').width;

const MenuCircle = (props: IMenuCustomProps) => {
  const { items, selected, isScrollable } = props;
  const refScrollContent: MutableRefObject<any> = useRef(null);

  const defaultPressNavItem = (index: number) => {
    if (isScrollable) {
      refScrollContent?.current?.scrollTo({
        x: widthScreen * index,
        y: 0,
      });
    }
  };

  function render() {
    return (
      <HStack w="full" p="3" space={2}>
        {items.map((item, index) => {
          return (
            <ButtonCircle
              key={index}
              title={item.title}
              onPress={item.onPress || (() => defaultPressNavItem(index))}
              image={item.image || ''}
              isSelected={selected === index}
            />
          );
        })}
      </HStack>
    );
  }
  return isScrollable ? (
    <ScrollView horizontal ref={refScrollContent}>
      {render()}
    </ScrollView>
  ) : (
    render()
  );
};

export default MenuCircle;
