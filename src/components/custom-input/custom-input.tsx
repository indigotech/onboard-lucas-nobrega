import {TextInput, TextInputProps} from 'react-native';
import React, {forwardRef} from 'react';
import * as Styled from './custom-input.styles';

export const CustomInput = forwardRef<TextInput, TextInputProps>(
  ({...rest}, ref) => {
    return (
      <Styled.Container>
        <Styled.Input {...rest} placeholderTextColor={'gray'} ref={ref} />
      </Styled.Container>
    );
  },
);
