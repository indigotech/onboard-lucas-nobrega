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
import {TitleHeader} from '../../../../components/title-header/title-header.styles';
import {LogoTaq} from '../../../../components/logo-taq/logo-taq.styles';

export function SignUpScreen(props: NavigationComponentProps) {
  const {isLoadingCreateUser, signUp} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState<Date>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const isEmailValid = RegexEmail.test(email);
  const isPasswordValid = RegexPassword.test(password);

  const handleValidationName = e => {
    e.preventDefault();
    return name.length > 0 ? '' : 'Nome inválido!';
  };
  const handleValidationEmail = e => {
    e.preventDefault();
    return isEmailValid ? '' : 'Email Inválido!';
  };
  const handleValidationPassword = e => {
    e.preventDefault();
    return isPasswordValid ? '' : 'Senha Inválido!';
  };
  const handleValidationPhone = e => {
    e.preventDefault();
    return phone.length > 15 ? '' : 'Telefone Inválido!';
  };
  const handleValidationRole = () => {
    return roles === undefined ? 'Cargo Inválido!' : '';
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
    if (role.length === 0) {
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
      <LogoTaq source={Logo} resizeMode="contain" />

      <TitleHeader>Cadastrar Usuário</TitleHeader>

      <CustomInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        onBlurValidation={handleValidationName}
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
        onBlurValidation={handleValidationEmail}
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
        onBlurValidation={handleValidationPassword}
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
        onBlurValidation={handleValidationPhone}
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
        onBlurValidation={handleValidationRole}
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
