import {useCallback} from 'react';
import {Auth, INITIAL_STORE} from '../stores/auth-store';
import {useLoginMutation} from '../graphql/mutations/login';
import {Alert} from 'react-native';

export type Credentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const [login, {loading}] = useLoginMutation();

  const signIn = useCallback(
    async (credentials: Credentials) => {
      const {data, errors} = await login({
        variables: {
          data: credentials,
        },
      });

      if (!data || errors) {
        Alert.alert(
          'Credenciais Inválidas',
          'Por favor, verifique seu e-mail e senha',
        );
        return;
      }
      Auth.useStore.setState(prevStore => ({
        ...prevStore,
        token: data.login.token ?? null,
        user: data.login.user ?? null,
      }));
    },
    [login],
  );

  const signOut = useCallback(() => {
    Auth.useStore.setState(INITIAL_STORE);
  }, []);

  return {
    token: Auth.token,
    isLoading: loading,
    signIn,
    signOut,
  };
};
