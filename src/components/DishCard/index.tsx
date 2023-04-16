import { HStack, Image, Text, View } from 'native-base';
import { formatToCurrency, getImage } from 'src/utils/common';

export interface IDishCardProps {
  image: string;
  title: string;
  children?: JSX.Element;
  imageSize?: string;
  quantity?: number;
  topComponent?: JSX.Element;
}

const DishCard = (props: any) => {
  const { title, image, children, price, imageSize, quantity, topComponent } =
    props;
  return (
    <View w="100%">
      {topComponent}
      {!!topComponent && (
        <View
          w="full"
          h="1px"
          borderRadius="1px"
          backgroundColor="muted.500"
          my={4}
          opacity={20}></View>
      )}
      <HStack space={4}>
        <Image
          size={imageSize || '100'}
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
          <HStack flex={1}>
            <Text color="dark.50" fontSize={13} flex={1.5}>
              {'Giá: ' + formatToCurrency(price)}
            </Text>
            {!!quantity && (
              <Text color="dark.50" fontSize={13} flex={1}>
                {'Số lượng: ' + quantity}
              </Text>
            )}
          </HStack>

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
