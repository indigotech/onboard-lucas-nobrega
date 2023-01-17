import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CustomButton} from '../components/custom-button';
import {SeparatorItem} from '../components/separator-item';
import {UserList} from '../components/user-item';
import {UserListResponseNodes} from '../modules/users/graphql/type-query';
import {useAuth} from '../modules/auth/hooks/use-auth';
import {USERS_QUERY} from '../modules/users';
import {CustomButtonLink} from '../components/custom-button-link';
import {Navigation} from 'react-native-navigation';
import {NavigationDefaultProps, SCREENS} from '../navigations';

const USERS_LIMIT = 20;

export function HomeScreen(props: NavigationDefaultProps) {
  const renderUser = ({item}: ListRenderItemInfo<UserListResponseNodes>) => {
    return <UserList {...item} />;
  };

  const [users, setUsers] = useState<UserListResponseNodes[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const {signOut} = useAuth();

  useQuery(USERS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {data: {limit: USERS_LIMIT, offset}},
    onCompleted: data => {
      setHasNextPage(data.users.pageInfo.hasNextPage);
      setUsers(prev => [...prev, ...data.users.nodes]);
    },
  });

  function goToSingUpScreen() {
    Navigation.push(props.componentId, {
      component: {
        name: SCREENS.signUp.name,
      },
    });
  }

  function fetchNewUsers() {
    if (!hasNextPage) {
      return;
    }
    setOffset(prev => prev + USERS_LIMIT);
  }

  return (
    <View style={styles.root}>
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>Users</Text>}
        ItemSeparatorComponent={SeparatorItem}
        keyExtractor={item => item.id}
        data={users}
        onEndReachedThreshold={0.3}
        onEndReached={fetchNewUsers}
        renderItem={renderUser}
      />

      <CustomButtonLink onPress={goToSingUpScreen}>
        Cadastrar Usuário
      </CustomButtonLink>

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
