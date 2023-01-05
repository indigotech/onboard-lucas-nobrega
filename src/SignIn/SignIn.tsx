import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import Logo from '../assets/images/logoTaqtile.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    console.warn('Sign in');
  };

  const {height} = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
      onTouchStart={Keyboard.dismiss}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo(a){'\n'}à Taqtile!</Text>
      <CustomInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton text="Entrar" onPress={onSignInPressed} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    maxWidth: 200,
    maxHeight: 200,
  },
  title: {
    marginBottom: 'auto',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 80,
  },
});

export default SignIn;
