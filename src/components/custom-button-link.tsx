import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

export function CustomButtonLink({
  children,
  style,
  ...rest
}: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...rest}>
      <Text style={[styles.label, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#4318FF',
    fontSize: 16,
  },
});
