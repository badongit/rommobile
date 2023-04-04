import { Box, Center, Icon, Pressable, Text, VStack } from 'native-base';

export interface IMenuCardProps {
  backgroundIcon: string;
  IconElement: JSX.Element;
  title: string;
  onPress: any;
}
const MenuCard = (props: IMenuCardProps) => {
  const { backgroundIcon, IconElement, title, onPress } = props;
  return (
    <Pressable onPress={onPress}>
      <Box w="100%" rounded="lg" backgroundColor="light.50">
        <VStack alignItems="center">
          <Center borderRadius="full" backgroundColor={'red.600'} p="5">
            <Icon as={IconElement} />
          </Center>
          <Text color="dark.50">{title}</Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default MenuCard;
