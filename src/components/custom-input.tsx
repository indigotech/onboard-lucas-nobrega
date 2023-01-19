import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import React, {forwardRef} from 'react';

export const CustomInput = forwardRef<TextInput, TextInputProps>(
  ({...rest}, ref) => {
    return (
      <View style={styles.container}>
        <TextInput
          {...rest}
          placeholderTextColor={'gray'}
          style={styles.input}
          ref={ref}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  input: {
    fontSize: 18,
    borderBottomColor: '#6d50f1',
    borderBottomWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});
