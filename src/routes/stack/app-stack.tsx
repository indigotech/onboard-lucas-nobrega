import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../../screens/home';
import {propsNavigationStack} from './models';

const {Navigator, Screen} = createNativeStackNavigator<propsNavigationStack>();

export const AppStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};
