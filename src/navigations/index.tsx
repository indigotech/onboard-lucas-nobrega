import {Navigation} from 'react-native-navigation';
import {withProviders} from '../providers';
import {HomeScreen} from '../screens/home';
import {SignInScreen, SignUpScreen, FullUserScreen} from '../modules/auth';
import {setIsAuthenticatedStack} from './utils/setIsAuthenticatedStack';
import {UserListResponseNodes} from '../modules/users/graphql/type-query';

export interface NavigationDefaultProps {
  componentId: string;
  user?: UserListResponseNodes;
}

export const SCREENS = {
  home: {
    name: 'Home',
    component: HomeScreen,
  },
  signIn: {
    name: 'SignIn',
    component: SignInScreen,
  },
  signUp: {
    name: 'SignUp',
    component: SignUpScreen,
  },
  fullUser: {
    name: 'FullUser',
    component: FullUserScreen,
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
