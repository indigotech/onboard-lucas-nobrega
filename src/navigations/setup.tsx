import React, {FunctionComponent} from 'react';
import {Navigation} from 'react-native-navigation';
import {SignIn} from '../screens/sign-in';
import {Home} from '../screens/home';
// import {useAuth} from '../contexts/auth';
// import {Text, View} from 'react-native';
import {AppProviders} from '../providers';

// const {authData, isLoading} = useAuth();
// const Root = () => {
//   console.log('authData', authData);
//   return (
//     <View>
//       <Text>texto</Text>
//     </View>
//   );
// };

const withProviders =
  (Component: FunctionComponent) => () => (props: Record<string, any>) => {
    return (
      <AppProviders>
        <Component {...props} />
      </AppProviders>
    );
  };

export const setupNavigation = () => {
  Navigation.registerComponent('com.TaqOnboard.Home', withProviders(Home));
  Navigation.registerComponent('com.TaqOnboard.SignIn', () => SignIn);

  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
  });

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'com.TaqOnboard.SignIn',
        },
      },
    });
  });
};

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
