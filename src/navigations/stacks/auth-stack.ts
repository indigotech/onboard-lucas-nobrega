import {LayoutRoot} from 'react-native-navigation';
import {SCREENS} from '..';

export function setAuthStack(): LayoutRoot {
  return {
    root: {
      stack: {
        id: 'AUTH_STACK',
        children: [
          {
            component: {
              name: SCREENS.signIn.name,
            },
          },
        ],
      },
    },
  };
}
