import {Navigation} from 'react-native-navigation';
import {Auth} from '../../modules/auth';
import {setAppStack} from '../stacks/app-stack';
import {setAuthStack} from '../stacks/auth-stack';

export function setIsAuthenticatedStack(
  isAuthenticated = Auth.isAuthenticated,
) {
  Navigation.setRoot(isAuthenticated ? setAppStack() : setAuthStack());
}
