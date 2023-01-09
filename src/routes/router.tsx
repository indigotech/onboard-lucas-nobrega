import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../contexts/auth';
import {AppStack} from './stack/app-stack';
import {AuthStack} from './stack/auth-stack';
import {StyleSheet, Text, View} from 'react-native';

export const Route = () => {
  const {authData, isLoading} = useAuth();
  if (isLoading) {
    return (
      <View style={styles.root}>
        <Text>Carregando aplicativo...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
