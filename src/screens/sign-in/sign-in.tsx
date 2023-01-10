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

import Logo from '../../assets/images/logo.png';

import {CustomInput} from '../../components/custom-input';
import {CustomButton} from '../../components/custom-button';
import {useAuth} from '../../contexts/auth';

const RegexEmail = RegExp(/^[\w.]+@([\w-]+.)+[\w-]{2,4}$/);
const RegexPassword = RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{7,}$/);

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth();

  const handleSignInPressed = async () => {
    const isEmailValid = RegexEmail.test(email);
    const isPasswordValid = RegexPassword.test(password);

    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
    }
    signIn(email, password);
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
        returnKeyType="next"
      />
      <CustomInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSignInPressed}
        secureTextEntry
      />
      <CustomButton text="Entrar" onPress={handleSignInPressed} />
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
