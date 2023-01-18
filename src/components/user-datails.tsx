import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {maskString, patternPhone} from '../libs/utils/mask';
import {UserListResponseNodes} from '../modules/users/graphql/type-query';

export function UserDetails(user: UserListResponseNodes) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>name: {user.name}</Text>
      <Text style={styles.text}>email: {user.email}</Text>
      <Text style={styles.text}>id: {user.id}</Text>
      <Text style={styles.text}>role: {user.role}</Text>
      <Text style={styles.text}>
        phone: {maskString.apply(user.phone, patternPhone)}
      </Text>
      <Text style={styles.text}>bithDate: {user.birthDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    marginBottom: 'auto',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#24170d',
  },
});
