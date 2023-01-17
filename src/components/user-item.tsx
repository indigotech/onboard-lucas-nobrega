import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserListResponseNodes} from '../modules/users/graphql/type-query';

export function UserList({
  role,
  phone,
  name,
  id,
  email,
  birthDate,
}: UserListResponseNodes) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>role: {role}</Text>
      <Text style={styles.text}>phone: {maskString.apply(phone, pattern)}</Text>
      <Text style={styles.text}>name: {name}</Text>
      <Text style={styles.text}>id: {id}</Text>
      <Text style={styles.text}>email: {email}</Text>
      <Text style={styles.text}>bithDate: {birthDate}</Text>
    </View>
  );
}

const maskString = {
  apply(value: string, pattern = '') {
    let i = 0;
    const v = String(value);
    return pattern.replace(/#/g, () => v[i++]).replace(/undefined/g, '');
  },
};
const pattern = '(##) # ####-####';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#24170d',
  },
});
