import {Navigation} from 'react-native-navigation';

import {withProviders} from '../providers';
import {HomeScreen} from '../screens/home';
import {SignInScreen, ForgotPasswordScreen} from '../modules/auth';
import {setIsAuthenticatedStack} from './utils/setIsAuthenticatedStack';

export type NavigationDefaultProps = {
  componentId: string;
  rootTag: number;
};

export const SCREENS = {
  home: {
    name: 'Home',
    component: HomeScreen,
  },
  signIn: {
    name: 'SignIn',
    component: SignInScreen,
  },
  forgotPassword: {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
  },
};

export function setupNavigation() {
  Object.values(SCREENS).forEach(({name, component}) => {
    Navigation.registerComponent(name, withProviders(component));
  });

  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
  });

  Navigation.events().registerAppLaunchedListener(setIsAuthenticatedStack);
}
