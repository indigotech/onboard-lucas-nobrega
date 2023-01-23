import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import * as Styled from './custom-button-link.styles';

export function CustomButtonLink({
  children,
  style,
  ...rest
}: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest}>
      <Styled.Label style={[styles.label, style]}>{children}</Styled.Label>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    marginBottom: 10,
    color: '#4318FF',
    fontSize: 16,
    alignSelf: 'center',
  },
});
