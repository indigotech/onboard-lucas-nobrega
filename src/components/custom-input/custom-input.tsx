import {TextInput, TextInputProps} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {
  ContainerCustomInput,
  ErrorMessage,
  CustomInputText,
} from './custom-input.styles';
interface CustomInputProps extends TextInputProps {
  onBlurValidation: (e: any) => string;
  ref: TextInputProps;
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({onBlurValidation, ...rest}, ref) => {
    const [errorMessage, setErrorMessage] = useState('');
    const handlePressOut = e => {
      const onBlurValidationString = onBlurValidation(e);
      setErrorMessage(onBlurValidationString);
    };
    return (
      <ContainerCustomInput>
        <CustomInputText
          hasError={!!errorMessage}
          {...rest}
          placeholderTextColor={'gray'}
          ref={ref}
          onBlur={handlePressOut}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </ContainerCustomInput>
    );
  },
);
