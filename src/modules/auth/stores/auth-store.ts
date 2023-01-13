import {useAsyncStorage} from '@react-native-community/async-storage';
import {create} from 'zustand';
import {User} from '../../../models/user';
import {setIsAuthenticatedStack} from '../../../navigations/utils/setIsAuthenticatedStack';

interface AuthStore {
  user: User | null;
  token: string | null;
}

export const INITIAL_STORE = {
  token: null,
  user: null,
};

const useStore = create<AuthStore>(() => INITIAL_STORE);

useStore.subscribe(async ({token}) => {
  const isAuthenticated = !!token;
  if (token) {
    return await useAsyncStorage('token').setItem(token, () => {
      setIsAuthenticatedStack(isAuthenticated);
    });
  }
  setIsAuthenticatedStack(false);
});

export const Auth = {
  token: useStore.getState().token,
  useStore,
  isAuthenticated: !!useStore.getState().token,
};
