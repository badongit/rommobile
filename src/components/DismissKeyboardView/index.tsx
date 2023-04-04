import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

interface Props extends TextInputProps {
  backgroundColor?: string;
  enabled?: boolean;
}

export const DismissKeyboardView = (props: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 0,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled={props.enabled ?? false}
        style={{
          flex: 1,
          padding: 0,
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {props.children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
