import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';

import Logo from '../assets/images/logoTaqtile.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const RegexEmail = RegExp(/^[\w-\.]{3,}@([\w-]{3,}\.)+(?:com)$/);
const RegexPassword = RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{7,}$/);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    const isEmailValid = RegexEmail.test(email);
    const isPasswordValid = RegexPassword.test(password);

    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
    }
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
        onSubmitEditing={onSignInPressed}
        keyboardType="email-address"
        returnKeyType="next"
      />
      <CustomInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={onSignInPressed}
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

export default SignIn;
