import React, {useRef, useState} from 'react';
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
import {TextInput} from 'react-native';
import {Navigation} from 'react-native-navigation';

const RegexEmail = RegExp(/^[\w.]+@([\w-]+.)+[\w-]{2,4}$/);
const RegexPassword = RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{7,}$/);

export const SignIn = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef<TextInput>(null);
  const {signIn} = useAuth();

  const handleSignInPressed = async () => {
    const isEmailValid = RegexEmail.test(email);
    const isPasswordValid = RegexPassword.test(password);
    console.log('chegou');

    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
    }
    await signIn(email, password);
    console.log('signin');
    Navigation.push(props.componentId, {
      component: {name: 'com.TaqOnboard.Home'},
    });
  };

  const {height} = useWindowDimensions();
  // console.log('password input', passwordInputRef.current?.focus);
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
        onKeyPress={passwordInputRef.current?.focus}
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
        ref={passwordInputRef}
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
