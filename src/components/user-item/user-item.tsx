import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {UserList} from '../../data/user-list';

export function UserItem({email, image, password}: UserList) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.content}>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.password}>{password}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignitems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 20,
  },
  image: {
    width: 120,
    height: 100,
  },
  content: {
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#24170d',
  },
  password: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#24170d',
  },
});
