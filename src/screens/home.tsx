import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CustomButton} from '../components/custom-button';
import {SeparatorItem} from '../components/separator-item';
import {UserList} from '../components/user-item';
import {QueryDataCount, User} from '../models/user';
import {useAuth} from '../modules/auth/hooks/use-auth';
import {USERS_QUERY} from '../modules/users';

export function HomeScreen() {
  const {signOut} = useAuth();
  const renderList = ({item}: ListRenderItemInfo<User>) => {
    return <UserList {...item} />;
  };

  const [queryDataNodes, setQueryDataNodes] = useState<User[]>([]);
  const [queryDataCount, setQueryDataCount] = useState<QueryDataCount>();
  const [userDatas, setUserDatas] = useState<any>();

  useQuery(USERS_QUERY, {
    variables: {data: {limit: null, offset: null}},
    onCompleted: userData => {
      setUserDatas(userData);
      setQueryDataNodes(userData.users.nodes);
      setQueryDataCount(userData.users.count);
    },
  });
  console.log(userDatas);

  return (
    <View style={styles.root}>
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>Users</Text>}
        ItemSeparatorComponent={SeparatorItem}
        keyExtractor={item => item.email}
        data={queryDataNodes}
        // onEndReachedThreshold={0.2}
        // ListFooterComponent={<ActivityIndicator size="large" color="#6d50f1" />}
        renderItem={renderList}
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
  title: {
    color: '#6d50f1',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
