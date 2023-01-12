import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../components/button';
import {Auth} from '../modules/auth';

export function HomeScreen() {
  const {signOut} = Auth.useActions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button.Link onPress={signOut}>Sair</Button.Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: '#1B2559',
    marginBottom: 32,
  },
});
