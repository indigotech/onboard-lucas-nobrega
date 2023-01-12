import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  Platform,
  useWindowDimensions,
  Text,
  TextInput,
} from 'react-native';
import {CustomButton} from '../../../components/custom-button';
import {CustomInput} from '../../../components/custom-input';
import Logo from '../../../assets/images/logo.png';
import {useAuth} from '../hooks/use-auth';

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, isLoading} = useAuth();

  const RegexEmail = RegExp(/^[\w.]+@([\w-]+.)+[\w-]{2,4}$/);
  const RegexPassword = RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{7,}$/);
  const passwordInputRef = useRef<TextInput>(null);

  async function handleSignInPressed() {
    const isEmailValid = RegexEmail.test(email);
    const isPasswordValid = RegexPassword.test(password);

    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
    }
    await signIn({email, password});
  }

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
        onSubmitEditing={() => {
          passwordInputRef.current?.focus();
        }}
        keyboardType="email-address"
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <CustomInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSignInPressed}
        returnKeyType="send"
        autoCapitalize="none"
        ref={passwordInputRef}
        blurOnSubmit={false}
        secureTextEntry
      />

      <CustomButton
        text="Entrar"
        isLoading={isLoading}
        onPress={handleSignInPressed}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
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