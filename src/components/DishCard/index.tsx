import { HStack, Image, Text, View } from 'native-base';
import { formatToCurrency, getImage } from 'src/utils/common';

export interface IDishCardProps {
  image: string;
  title: string;
  children?: JSX.Element;
}

const DishCard = (props: any) => {
  const { title, image, children, price } = props;
  return (
    <View w="100%">
      <HStack space={4}>
        <Image
          size={100}
          alt={title}
          source={{
            uri: getImage(image),
          }}
          borderRadius={8}
        />
        <View flex={1}>
          <Text
            color="dark.50"
            fontWeight="semibold"
            fontSize={15}
            isTruncated={true}>
            {title}
          </Text>
          <Text color="dark.50" fontSize={13}>
            {'Giá: ' + formatToCurrency(price)}
          </Text>
          {children}
        </View>
      </HStack>
      <View
        w="full"
        h="1px"
        borderRadius="1px"
        backgroundColor="muted.500"
        mt={4}
        opacity={20}></View>
    </View>
  );
};

export default DishCard;
