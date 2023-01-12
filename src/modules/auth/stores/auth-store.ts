import {useCallback} from 'react';
import {create} from 'zustand';
import {User} from '../../../models/user';
import {useLoginMutation} from '../graphql/mutations/login';
import {setIsAuthenticatedStack} from '../../../navigations/utils/setIsAuthenticatedStack';

type AuthStore = {
  user: User | null;
  token: string | null;
};

export type Credentials = {
  email: string;
  password: string;
};

const INITIAL_STORE = {
  token: null,
  user: null,
};

const useStore = create<AuthStore>(() => INITIAL_STORE);

useStore.subscribe(({token}) => {
  const isAuthenticated = !!token;
  setIsAuthenticatedStack(isAuthenticated);
});

const useActions = () => {
  const [login] = useLoginMutation();

  const signIn = useCallback(
    async (credentials: Credentials) => {
      const {data, errors} = await login({
        variables: {
          data: credentials,
        },
      });

      if (!data || errors) {
        return;
      }

      useStore.setState(prevStore => ({
        ...prevStore,
        token: data.login.token ?? null,
        user: data.login.user ?? null,
      }));
    },
    [login],
  );

  const signOut = useCallback(() => {
    useStore.setState(INITIAL_STORE);
  }, []);

  return {
    signIn,
    signOut,
  };
};

export const Auth = {
  useStore,
  useActions,
  isAuthenticated: !!useStore.getState().token,
};
