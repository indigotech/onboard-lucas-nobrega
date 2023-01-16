import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {CustomButton} from '../../../components/custom-button';
import {CustomInput} from '../../../components/custom-input';
import {useAuth} from '../hooks/use-auth';
import Logo from '../../../assets/images/logo.png';

export function SignUpScreen() {
  const {isLoading} = useAuth();

  async function handleSignUpPressed() {}

  const {height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Cadastrar Usuário</Text>

      <CustomInput placeholder="Seu email" autoCapitalize="none" />

      <CustomButton
        text="Entrar"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSignUpPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '15%',
  },
  logo: {
    width: '40%',
    maxWidth: 150,
    maxHeight: 150,
  },
  title: {
    marginBottom: 'auto',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
