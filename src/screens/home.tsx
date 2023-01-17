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
import {
  UserListResponse,
  UserListResponseNodes,
} from '../modules/users/graphql/type-query';
import {useAuth} from '../modules/auth/hooks/use-auth';
import {USERS_QUERY} from '../modules/users';
import {CustomButtonLink} from '../components/custom-button-link';
import {Navigation} from 'react-native-navigation';
import {NavigationDefaultProps, SCREENS} from '../navigations';

const INITIAL_PAGINATION = {
  limit: 20,
  offset: 0,
};

export function HomeScreen(props: NavigationDefaultProps) {
  const renderList = ({item}: ListRenderItemInfo<UserListResponseNodes>) => {
    return <UserList {...item} />;
  };

  const [users, setUsers] = useState<UserListResponseNodes[]>([]);
  const [pagination, setPagination] = useState({
    ...INITIAL_PAGINATION,
    hasNextPage: true,
  });

  const {signOut} = useAuth();
  const {refetch} = useQuery<UserListResponse>(USERS_QUERY, {
    variables: {data: INITIAL_PAGINATION},
    onCompleted: ({users: {nodes, pageInfo}}) => {
      const {offset, hasNextPage} = pageInfo;

      setUsers(prev => [...prev, ...nodes]);
      setPagination(prev => ({...prev, offset, hasNextPage}));
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
    if (!pagination.hasNextPage) {
      return;
    }

    refetch({
      data: {
        limit: INITIAL_PAGINATION.limit,
        offset: INITIAL_PAGINATION.limit + pagination.offset,
      },
    });
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
        renderItem={renderList}
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
