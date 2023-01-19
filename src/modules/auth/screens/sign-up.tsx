import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomButton} from '../../../components/custom-button';
import {CustomInput} from '../../../components/custom-input';
import {useAuth} from '../hooks/use-auth';
import DatePicker, {DatePickerCustomStylesProps} from 'react-native-datepicker';
import {Select} from '../../../components/select';
import Logo from '../../../assets/images/logo.png';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {maskPhone, unMaskedPhone} from '../../../libs/utils/mask';
import {RegexEmail, RegexPassword} from '../../../libs/utils/validate';

export function SignUpScreen(props: NavigationComponentProps) {
  const {isLoadingCreateUser, signUp} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState<Date>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const numberInputRef = useRef<TextInput>(null);

  const roles = [{name: 'user'}, {name: 'admin'}];

  async function handleSignUpPressed() {
    const isEmailValid = RegexEmail.test(email);
    const isPasswordValid = RegexPassword.test(password);

    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
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

  const {height} = useWindowDimensions();

  return (
    <KeyboardAwareScrollView
      onTouchStart={Keyboard.dismiss}
      contentContainerStyle={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />

      <Text style={styles.title}>Cadastrar Usuário</Text>

      <CustomInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
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
  dateComponent: {
    width: '100%',
    height: 50,
    textAlign: 'left',
    paddingHorizontal: 24,
    marginBottom: 16,
    position: 'relative',
  },
});
