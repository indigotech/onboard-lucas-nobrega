import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import * as Styled from './custom-button-link.styles';

export function CustomButtonLink({children, ...rest}: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest}>
      <Styled.Label>{children}</Styled.Label>
    </TouchableOpacity>
  );
}
