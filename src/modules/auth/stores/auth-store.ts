import {create} from 'zustand';
import {User} from '../../../models/user';
import {setIsAuthenticatedStack} from '../../../navigations/utils/setIsAuthenticatedStack';

type AuthStore = {
  user: User | null;
  token: string | null;
};

export const INITIAL_STORE = {
  token: null,
  user: null,
};

const useStore = create<AuthStore>(() => INITIAL_STORE);

useStore.subscribe(({token}) => {
  const isAuthenticated = !!token;
  setIsAuthenticatedStack(isAuthenticated);
});

export const Auth = {
  useStore,
  isAuthenticated: !!useStore.getState().token,
};
