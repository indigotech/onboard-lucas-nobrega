import React, {useRef, useState} from 'react';
import {Alert, Keyboard, Platform, TextInput} from 'react-native';
import {CustomButton} from '../../../../components/custom-buttom/custom-button';
import {CustomInput} from '../../../../components/custom-input/custom-input';
import Logo from '../../../../assets/images/logo.png';
import {useAuth} from '../../hooks/use-auth';
import {RegexEmail, RegexPassword} from '../../../../libs/utils/validate';
import {TitleHeader} from '../../../../components/title-header/title-header.styles';
import {ContainerSignInScreen} from './sign-in.styles';
import {LogoTaq} from '../../../../components/logo-taq/logo-taq.styles';

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isEmailValid = RegexEmail.test(email);
  const isPasswordValid = RegexPassword.test(password);

  const handleValidationEmail = e => {
    e.preventDefault();
    return isEmailValid ? '' : 'Email Inválido!';
  };
  const handleValidationPassword = e => {
    e.preventDefault();
    return isPasswordValid ? '' : 'Senha Inválido!';
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
    <ContainerSignInScreen
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onTouchStart={Keyboard.dismiss}>
      <LogoTaq source={Logo} resizeMode="contain" />
      <TitleHeader>Bem-vindo(a){'\n'}à Taqtile!</TitleHeader>
      <CustomInput
        placeholder="E-mail"
        onBlurValidation={handleValidationEmail}
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
        onBlurValidation={handleValidationPassword}
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
    </ContainerSignInScreen>
  );
}
