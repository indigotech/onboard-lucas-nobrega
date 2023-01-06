import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import React from 'react';

const CustomInput = ({...rest}: TextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        placeholderTextColor={'gray'}
        style={styles.input}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  input: {
    fontSize: 18,

    borderBottomColor: '#6d50f1',
    borderBottomWidth: 2,

    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});

export default CustomInput;
