import { Button, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
  onPress: any;
  title: string;
}

const CustomButton = (props: Props) => {
  const { title, onPress } = props;
  return (
    <Button
      backgroundColor={props.disabled ? 'muted.500' : 'red.500'}
      {...props}
      onPress={onPress}>
      <Text color="light.50">{title}</Text>
    </Button>
  );
};

export default CustomButton;
