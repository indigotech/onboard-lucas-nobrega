import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Button} from '../../../components/button';
import {Input} from '../../../components/input';
import {Auth} from '../stores/auth-store';
import {SCREENS, NavigationDefaultProps} from '../../../navigations';

export function SignInScreen(props: NavigationDefaultProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = Auth.useActions();

  function goToForgotPasswordScreen() {
    Navigation.push(props.componentId, {
      component: {
        name: SCREENS.forgotPassword.name,
      },
    });
  }

  async function handleSignIn() {
    await signIn({email, password});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignIn</Text>

      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        autoCapitalize="none"
      />

      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Sua senha"
        autoCapitalize="none"
        secureTextEntry
      />

      <Button style={styles.button} onPress={handleSignIn}>
        Entrar
      </Button>

      <Button.Link onPress={goToForgotPasswordScreen}>
        Esqueceu sua senha?
      </Button.Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: '#1B2559',
    marginBottom: 32,
  },
  button: {
    marginBottom: 16,
  },
});
