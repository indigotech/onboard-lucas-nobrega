import React, {FunctionComponent, PropsWithChildren} from 'react';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaView, StyleSheet} from 'react-native';
import {client} from '../libs/apollo-client';
import {AuthProvider} from '../contexts/auth';

export const AppProviders = ({children}: PropsWithChildren) => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.root}>
        <AuthProvider>{children}</AuthProvider>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export const withAppProviders =
  (Component: FunctionComponent) => () => (props: any) => {
    return (
      <AppProviders>
        <Component {...props} />
      </AppProviders>
    );
  };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});
