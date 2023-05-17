import { Box, Center, Icon, Pressable, Text, VStack } from 'native-base';
import { RoleEnum } from 'src/constants/enums';

export interface IMenuCardProps {
  backgroundIcon: string;
  IconElement: JSX.Element;
  title: string;
  onPress: any;
  roleAllow?: RoleEnum[];
}
const MenuCard = (props: IMenuCardProps) => {
  const { backgroundIcon, IconElement, title, onPress } = props;
  return (
    <Pressable onPress={onPress}>
      <Box w="100%" rounded="lg" backgroundColor="light.50" p="5">
        <VStack alignItems="center">
          <Center
            borderRadius="full"
            backgroundColor={backgroundIcon}
            w="75"
            h="75">
            <Icon as={IconElement} size={12} color="light.50" />
          </Center>
          <Text color="dark.50" bold={true} mt="3">
            {title}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default MenuCard;
