import {useCallback, useState} from 'react';
import {Auth, INITIAL_STORE} from '../stores/auth-store';
import {useLoginMutation} from '../graphql/mutations/login';

export type Credentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const [login] = useLoginMutation();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(
    async (credentials: Credentials) => {
      setIsLoading(true);
      const {data, errors} = await login({
        variables: {
          data: credentials,
        },
      });

      if (!data || errors) {
        setIsLoading(false);
        return;
      }
      console.log('chegou');
      Auth.useStore.setState(prevStore => ({
        ...prevStore,
        token: data.login.token ?? null,
        user: data.login.user ?? null,
      }));

      setIsLoading(false);
    },
    [login],
  );

  const signOut = useCallback(() => {
    Auth.useStore.setState(INITIAL_STORE);
  }, []);

  return {
    token: Auth.token,
    isLoading,
    signIn,
    signOut,
  };
};
