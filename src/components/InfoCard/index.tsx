import {
  Box,
  Center,
  ColorModeOptions,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { ILinearGradientProps } from 'native-base/lib/typescript/components/primitives/Box/types';
import {
  ColorType,
  ResponsiveValue,
} from 'native-base/lib/typescript/components/types';

export interface IInfoCardProps {
  code: string;
  onPress: any;
  children?: any;
  backgroundColor?: ResponsiveValue<ColorType | ILinearGradientProps>;
}
const InfoCard = (props: IInfoCardProps) => {
  const { code, onPress, children, backgroundColor } = props;
  return (
    <Pressable onPress={onPress}>
      <Box
        w="100%"
        rounded="lg"
        backgroundColor={backgroundColor || 'light.50'}
        p="5">
        <VStack alignItems="center">
          <Center>
            <Text fontSize="20" color="light.50">
              {code}
            </Text>
          </Center>
          {children}
        </VStack>
      </Box>
    </Pressable>
  );
};

export default InfoCard;
