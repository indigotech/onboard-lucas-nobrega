import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {maskString, patternPhone} from '../libs/utils/mask';
import {UserListResponseNodes} from '../modules/users/graphql/type-query';
import {CustomButtonLink} from './custom-button-link';

export function UserList({
  name,
  email,
}: // id,
// role,
// phone,
// birthDate,
UserListResponseNodes) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>name: {name}</Text>
      <Text style={styles.text}>email: {email}</Text>
      <CustomButtonLink onPress={() => {}}>Mostrar detalhes v</CustomButtonLink>
      {/*<Text style={styles.text}>id: {id}</Text>
      <Text style={styles.text}>role: {role}</Text>
      <Text style={styles.text}>
        phone: {maskString.apply(phone, patternPhone)}
      </Text>
      <Text style={styles.text}>bithDate: {birthDate}</Text> */}
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
