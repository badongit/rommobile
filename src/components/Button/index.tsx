import { Button, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
  onPress: any;
  title: string;
  isLoading?: boolean;
}

const CustomButton = (props: Props) => {
  const { title, onPress, isLoading } = props;
  return (
    <Button
      backgroundColor={props.disabled ? 'muted.500' : 'red.500'}
      {...props}
      isLoading={isLoading}
      onPress={onPress}>
      <Text color="light.50">{title}</Text>
    </Button>
  );
};

export default CustomButton;
