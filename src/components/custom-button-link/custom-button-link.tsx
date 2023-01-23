import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {LabelCustomButtonLink} from './custom-button-link.styles';

export function CustomButtonLink({children, ...rest}: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest}>
      <LabelCustomButtonLink>{children}</LabelCustomButtonLink>
    </TouchableOpacity>
  );
}
