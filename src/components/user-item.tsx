import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserList} from '../data/user-list';

export function UserItem({email, password}: UserList) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{email}</Text>
      <Text style={styles.text}>{password}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#24170d',
  },
});
