import AsyncStorage from '@react-native-async-storage/async-storage';
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
  if (token) {
    await AsyncStorage.setItem('token', token);
  }
  setIsAuthenticatedStack(!!token);
  return token;
});

export const Auth = {
  token: useStore.getState().token,
  useStore,
  isAuthenticated: !!useStore.getState().token,
};
