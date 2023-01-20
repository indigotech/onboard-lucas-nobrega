import {TextInput, TextInputProps} from 'react-native';
import React, {forwardRef} from 'react';
import * as Styled from './custom-input.styles';

interface CustomInputProps extends TextInputProps {
  errorMessage?: string;
  onValidation: (e: any) => void;
  ref: TextInputProps;
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({onValidation, errorMessage, ...rest}, ref) => {
    const handlePressOut = e => {
      onValidation(e);
    };

    return (
      <Styled.ContainerCustomInput>
        <Styled.CustomInput
          {...rest}
          placeholderTextColor={'gray'}
          ref={ref}
          onBlur={handlePressOut}
        />
        {errorMessage && (
          <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
        )}
      </Styled.ContainerCustomInput>
    );
  },
);
