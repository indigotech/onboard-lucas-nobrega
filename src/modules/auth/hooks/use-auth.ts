import {useCallback} from 'react';
import {Auth, INITIAL_STORE} from '../stores/auth-store';
import {useLoginMutation} from '../graphql/mutations/login';
import {Alert} from 'react-native';
import {useCreateUserMutation} from '../graphql/mutations/add-user';

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  birthDate: Date | undefined;
}

export const useAuth = () => {
  const [login, {loading}] = useLoginMutation();
  const [createUser, {loading: loadingCreateUser}] = useCreateUserMutation();

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

  const signUp = useCallback(
    async (signUpCredentials: SignUpCredentials) => {
      const {data, errors} = await createUser({
        variables: {
          data: signUpCredentials,
        },
      });
      if (!data || errors) {
        Alert.alert('Erro de Requisição');
        return;
      }
    },
    [createUser],
  );

  return {
    isLoadingCreateUser: loadingCreateUser,
    token: Auth.token,
    isLoading: loading,
    signIn,
    signOut,
    signUp,
  };
};
