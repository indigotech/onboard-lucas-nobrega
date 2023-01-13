import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignIn} from '../../screens/sign-in';
import {propsNavigationStack} from './models';

const {Navigator, Screen} = createNativeStackNavigator<propsNavigationStack>();

export const AuthStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};
