import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../../components/button';
import {Input} from '../../../components/input';

export function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>

      <Input placeholder="Seu email" autoCapitalize="none" />

      <Button style={styles.button}>Enviar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: '#1B2559',
    marginBottom: 32,
  },
  button: {
    marginBottom: 16,
  },
});
