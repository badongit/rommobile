import { Input, Stack, Text, WarningOutlineIcon } from 'native-base';
import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

const InputControl = (props: any) => {
  const formContext = useFormContext();
  const { formState, getFieldState } = formContext;
  const { name, rules, defaultValue, label, ...inputProps } = props;
  const { invalid, error, isTouched } = getFieldState(name, formState);
  const { field } = useController({ name, rules, defaultValue });

  return (
    <Stack mx={4}>
      {label && <Text>{label}</Text>}
      <Input
        defaultValue={defaultValue}
        name={name}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        rules={rules}
        {...inputProps}
      />
      {invalid && isTouched && (
        <Text color="error.500" fontSize="xs">
          <WarningOutlineIcon color="error.500" size="xs" /> {error?.message}
        </Text>
      )}
    </Stack>
  );
};

export default InputControl;
