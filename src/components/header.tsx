import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Logo from '../assets/images/logo.png';
import {SeparatorItem} from './separator-item';

export const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>User</Text>
      <SeparatorItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    maxWidth: 150,
    maxHeight: 150,
  },
  title: {
    color: '#6d50f1',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
