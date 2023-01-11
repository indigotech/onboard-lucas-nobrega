import React from 'react';
import {View, StyleSheet, ListRenderItemInfo} from 'react-native';
import {CustomButton} from '../../components/custom-button';
import {UserItem} from '../../components/user-item';
import {userList, UserList} from '../../data/user-list';
import {useAuth} from '../../contexts/auth';
import {FlatList} from 'react-native-gesture-handler';
import {SeparatorItem} from '../../components/separator-item';

export const Home = () => {
  const {signOut} = useAuth();
  console.log('home');
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
};

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
