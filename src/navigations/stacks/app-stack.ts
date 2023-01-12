import {LayoutRoot} from 'react-native-navigation';
import {SCREENS} from '..';

export function setAppStack(): LayoutRoot {
  return {
    root: {
      stack: {
        id: 'APP_STACK',
        children: [
          {
            component: {
              name: SCREENS.home.name,
            },
          },
        ],
      },
    },
  };
}
