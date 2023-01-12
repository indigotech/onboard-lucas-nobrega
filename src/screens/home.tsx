import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {CustomButton} from '../components/custom-button';
import {SeparatorItem} from '../components/separator-item';
import {UserItem} from '../components/user-item';
import {UserList, userList} from '../data/user-list';
import {useAuth} from '../modules/auth/hooks/use-auth';

export function HomeScreen() {
  const {signOut} = useAuth();
  const renderItem = ({item}: ListRenderItemInfo<UserList>) => {
    return <UserItem {...item} />;
  };

  return (
    <View style={styles.root}>
      <FlatList
        ItemSeparatorComponent={SeparatorItem}
        keyExtractor={item => item.email}
        data={userList}
        renderItem={renderItem}
      />
      <CustomButton text="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f6f6f6',
    flex: 1,
  },
  footer: {
    flex: 1,
    position: 'relative',
  },
});
