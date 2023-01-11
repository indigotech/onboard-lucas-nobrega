import {LayoutStack} from 'react-native-navigation';

export const authStack: LayoutStack = {
  children: [
    {
      component: {
        name: 'com.TaqOnboard.SignIn',
      },
    },
  ],
};
