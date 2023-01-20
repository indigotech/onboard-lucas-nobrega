import React, {useRef, useState} from 'react';
import {Alert, Keyboard, Platform, TextInput} from 'react-native';
import {CustomButton} from '../../../../components/custom-buttom/custom-button';
import {CustomInput} from '../../../../components/custom-input/custom-input';
import Logo from '../../../../assets/images/logo.png';
import {useAuth} from '../../hooks/use-auth';
import {RegexEmail, RegexPassword} from '../../../../libs/utils/validate';
import * as Styled from './sign-in.styles';

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsgEmail, setErrMsgEmail] = useState('');
  const [errMsgPassword, setErrMsgPassword] = useState('');
  const isEmailValid = RegexEmail.test(email);
  const isPasswordValid = RegexPassword.test(password);

  const handleValidationEmail = e => {
    e.preventDefault();
    isEmailValid ? setErrMsgEmail('') : setErrMsgEmail('Email Inválido!');
  };

  const handleValidationPassword = e => {
    e.preventDefault();
    isPasswordValid
      ? setErrMsgPassword('')
      : setErrMsgPassword('Senha Inválida!');
  };

  const {signIn, isLoading} = useAuth();

  const passwordInputRef = useRef<TextInput>(null);

  async function handleSignInPressed() {
    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
    }
    await signIn({email, password});
  }

  return (
    <Styled.Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onTouchStart={Keyboard.dismiss}>
      <Styled.LogoTaq source={Logo} resizeMode="contain" />
      <Styled.Title>Bem-vindo(a){'\n'}à Taqtile!</Styled.Title>
      <CustomInput
        placeholder="E-mail"
        onValidation={handleValidationEmail}
        errorMessage={errMsgEmail}
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => {
          passwordInputRef.current?.focus();
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <CustomInput
        placeholder="Senha"
        onValidation={handleValidationPassword}
        errorMessage={errMsgPassword}
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSignInPressed}
        returnKeyType="send"
        autoCapitalize="none"
        ref={passwordInputRef}
        secureTextEntry
      />

      <CustomButton
        text="Entrar"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSignInPressed}
      />
    </Styled.Container>
  );
}
