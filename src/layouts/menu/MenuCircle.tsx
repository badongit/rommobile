import { HStack, ScrollView } from 'native-base';
import ButtonCircle from 'src/components/ButtonCircle';
import { IMenuCustomProps } from '.';
import { MutableRefObject, useEffect, useRef } from 'react';

const MenuCircle = (props: IMenuCustomProps) => {
  const { items, selected } = props;

  return (
    <HStack w="full" p="3" space={2}>
      {items.map((item, index) => {
        return (
          <ButtonCircle
            key={index}
            title={item.title}
            onPress={() => item.onPress(index)}
            image={item.image || ''}
            isSelected={selected === index}
          />
        );
      })}
    </HStack>
  );
};

export default MenuCircle;
