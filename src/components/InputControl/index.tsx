import {
  Input,
  Box,
  FormControl,
  Stack,
  WarningOutlineIcon,
} from 'native-base';

const InputControl = (props: any) => {
  const { isRequired, label, helperText } = props;
  return (
    <FormControl isRequired={isRequired ?? false}>
      <Stack mx={4}>
        {label ?? <FormControl.Label>{label}</FormControl.Label>}
        <Input
          _light={{
            bg: 'coolGray.100',
            _hover: {
              bg: 'coolGray.200',
            },
            _focus: {
              bg: 'coolGray.200:alpha.70',
            },
          }}
          _dark={{
            bg: 'coolGray.800',
            _hover: {
              bg: 'coolGray.900',
            },
            _focus: {
              bg: 'coolGray.900:alpha.70',
            },
          }}
          shadow={2}
          {...props}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {helperText}haha
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};

export default InputControl;
