import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {SignIn} from './src/sign-in';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.root}>
        <SignIn />
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
});
