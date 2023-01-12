import {ApolloProvider} from '@apollo/client';
import React, {FunctionComponent, PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {client} from '../libs/apollo-client';

function SafeArea({children}: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.safeAreaContainer,
        {paddingBottom: insets.bottom, paddingTop: insets.top},
      ]}>
      {children}
    </View>
  );
}

export function AppProviders({children}: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <SafeArea>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </SafeArea>
    </SafeAreaProvider>
  );
}

export function withProviders<P>(Component: FunctionComponent<P>) {
  return () => (props: any) => {
    return (
      <AppProviders>
        <Component {...props} />
      </AppProviders>
    );
  };
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
