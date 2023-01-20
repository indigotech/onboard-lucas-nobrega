import React, {useRef, useState} from 'react';
import {Alert, Keyboard, StyleSheet, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomButton} from '../../../../components/custom-buttom/custom-button';
import {CustomInput} from '../../../../components/custom-input/custom-input';
import {useAuth} from '../../hooks/use-auth';
import DatePicker, {DatePickerCustomStylesProps} from 'react-native-datepicker';
import {Select} from '../../../../components/select/select';
import Logo from '../../../../assets/images/logo.png';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {maskPhone, unMaskedPhone} from '../../../../libs/utils/mask';
import {RegexEmail, RegexPassword} from '../../../../libs/utils/validate';
import * as Styled from './sign-up.styles';

export function SignUpScreen(props: NavigationComponentProps) {
  const {isLoadingCreateUser, signUp} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState<Date>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [errMsgName, setErrMsgName] = useState('');
  const [errMsgEmail, setErrMsgEmail] = useState('');
  const [errMsgPassword, setErrMsgPassword] = useState('');
  const [errMsgPhone, setErrMsgPhone] = useState('');

  const isEmailValid = RegexEmail.test(email);
  const isPasswordValid = RegexPassword.test(password);

  const handleValidationName = e => {
    e.preventDefault();
    name.length > 0 ? setErrMsgName('') : setErrMsgName('Nome Inválido!');
  };
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
  const handleValidationPhone = e => {
    e.preventDefault();
    phone.length > 15
      ? setErrMsgPhone('')
      : setErrMsgPhone('Telefone Inválido!');
  };

  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const numberInputRef = useRef<TextInput>(null);

  const roles = [{name: 'user'}, {name: 'admin'}];

  async function handleSignUpPressed() {
    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
    }
    if (roles === ''['']) {
      return Alert.alert('Selecione um cargo de usuário!');
    }

    await signUp({
      name,
      email,
      password,
      phone: unMaskedPhone(phone),
      role,
      birthDate,
    });
    Navigation.pop(props.componentId);
  }

  return (
    <KeyboardAwareScrollView
      onTouchStart={Keyboard.dismiss}
      contentContainerStyle={styles.container}>
      <Styled.LogoTaq source={Logo} resizeMode="contain" />

      <Styled.Title>Cadastrar Usuário</Styled.Title>

      <CustomInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        onValidation={handleValidationName}
        errorMessage={errMsgName}
        onSubmitEditing={() => {
          emailInputRef.current?.focus();
        }}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <CustomInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        onValidation={handleValidationEmail}
        errorMessage={errMsgEmail}
        onSubmitEditing={() => {
          passwordInputRef.current?.focus();
        }}
        ref={emailInputRef}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <CustomInput
        placeholder="Senha"
        value={password}
        onValidation={handleValidationPassword}
        errorMessage={errMsgPassword}
        onChangeText={setPassword}
        onSubmitEditing={() => {
          numberInputRef.current?.focus();
        }}
        returnKeyType="next"
        autoCapitalize="none"
        keyboardType="name-phone-pad"
        ref={passwordInputRef}
        blurOnSubmit={false}
        secureTextEntry
      />
      <CustomInput
        placeholder="Número com DDD"
        value={phone}
        onValidation={handleValidationPhone}
        errorMessage={errMsgPhone}
        onChangeText={text => setPhone(maskPhone(text))}
        keyboardType="numbers-and-punctuation"
        returnKeyType="next"
        ref={numberInputRef}
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={false}
      />

      <Select
        options={roles}
        placeholder="Selecione um cargo"
        onChangeSelect={setRole}
      />

      <DatePicker
        date={birthDate}
        onDateChange={(dateStr, date) => setBirthDate(date)}
        style={styles.dateComponent}
        format="YYYY/MM/DD"
        minDate="1923/01/01"
        maxDate={new Date()}
        placeholder="Data de Nascimento"
        customStyles={customDatePicker}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showIcon={false}
        locale="en"
      />

      <CustomButton
        text="Cadastrar"
        isLoading={isLoadingCreateUser}
        disabled={isLoadingCreateUser}
        onPress={handleSignUpPressed}
      />
    </KeyboardAwareScrollView>
  );
}

const customDatePicker: DatePickerCustomStylesProps = {
  dateInput: {
    borderBottomColor: '#6d50f1',
    borderBottomWidth: 2,
    paddingHorizontal: 24,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    alignItems: 'flex-start',
  },
  placeholderText: {
    color: 'gray',
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  dateComponent: {
    width: '100%',
    height: 50,
    textAlign: 'left',
    paddingHorizontal: 24,
    marginBottom: 16,
    position: 'relative',
  },
});
