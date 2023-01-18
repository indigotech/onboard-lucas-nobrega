import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserListResponseNodes} from '../modules/users/graphql/type-query';
import {CustomButtonLink} from './custom-button-link';

interface UserListProps {
  user: UserListResponseNodes;
  onTap?: () => void;
}

export function UserList({user, onTap}: UserListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>name: {user.name}</Text>
      <Text style={styles.text}>email: {user.email}</Text>
      <CustomButtonLink onPress={onTap}>Mostrar detalhes</CustomButtonLink>
    </View>
  );
}

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
