import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

export function Input({...rest}: TextInputProps) {
  return (
    <TextInput {...rest} placeholderTextColor="#8F9BBA" style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8F9BBA',
    backgroundColor: '#F4F7FE',
    color: '#1B2559',
    fontStyle: 'normal',
    fontSize: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
