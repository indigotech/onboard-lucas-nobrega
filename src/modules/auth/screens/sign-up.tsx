import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {CustomButton} from '../../../components/custom-button';
import {CustomInput} from '../../../components/custom-input';
import {useAuth} from '../hooks/use-auth';
import DatePicker from 'react-native-datepicker';
import Logo from '../../../assets/images/logo.png';

export function SignUpScreen(this: {
  name: string;
  component: () => JSX.Element;
}) {
  const {isLoading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState<string | Date>('');
  const [cpf, setCpf] = useState('');

  const RegexEmail = RegExp(/^[\w.]+@([\w-]+.)+[\w-]{2,4}$/);
  const RegexPassword = RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{7,}$/);
  const RegexCpf = RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);

  const passwordInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);

  async function handleSignUpPressed() {
    const isEmailValid = RegexEmail.test(email);
    const isPasswordValid = RegexPassword.test(password);
    const isValidCpf = RegexCpf.test(cpf);

    if (!isEmailValid) {
      return Alert.alert('Email inválido!');
    }
    if (!isPasswordValid) {
      return Alert.alert('Senha Inválida!');
    }
    if (!isValidCpf) {
      return Alert.alert('CPF Inválido!');
    }
  }

  const {height} = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      onTouchStart={Keyboard.dismiss}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Cadastrar Usuário</Text>

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
        onSubmitEditing={() => {
          cpfInputRef.current?.focus();
        }}
        returnKeyType="next"
        autoCapitalize="none"
        ref={passwordInputRef}
        blurOnSubmit={false}
        secureTextEntry
      />
      <CustomInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numbers-and-punctuation"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={Keyboard.dismiss}
        maxLength={11}
        ref={cpfInputRef}
        blurOnSubmit={false}
      />

      <DatePicker
        date={date}
        onDateChange={setDate}
        style={styles.dateComponent}
        format="YYYY/MM/DD"
        minDate="01/01/1923"
        maxDate={new Date()}
        placeholder="Data de Nascimento"
        customStyles={{
          dateInput: {
            borderBottomColor: '#6d50f1',
            borderBottomWidth: 2,
            paddingHorizontal: 24,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderLeftColor: 'transparent',
          },
          placeholderText: {
            color: 'gray',
            fontSize: 18,
            alignSelf: 'flex-start',
          },
        }}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showIcon={false}
        locale="pt-br"
      />

      <CustomButton
        text="Cadastrar"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSignUpPressed}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  logo: {
    flex: 1,
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
  },
});
