import { Box, Image, Pressable, Text, VStack } from 'native-base';
import { getImage } from 'src/utils/common';

export interface IButtonCircleProps {
  onPress: any;
  title: string;
  isSelected: boolean;
  image: string;
  selectedColor?: string;
  children?: JSX.Element;
}

const ButtonCircle = (props: IButtonCircleProps) => {
  const { onPress, title, image, selectedColor, isSelected } = props;
  const color = selectedColor || 'red.500';
  return (
    <Pressable onPress={onPress}>
      <VStack alignItems="center">
        <Image
          size={50}
          borderRadius={100}
          source={{ uri: getImage(image) }}
          alt={title}
          borderWidth={2}
          borderColor={isSelected ? color : 'light.50'}
        />
        <Text
          fontSize={14}
          fontWeight={isSelected ? 'bold' : 'semibold'}
          color={isSelected ? color : 'dark.50'}
          px={2}>
          {title}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default ButtonCircle;
