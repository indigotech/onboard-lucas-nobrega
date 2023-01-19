import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {CustomButton} from '../components/custom-button';
import {SeparatorItem} from '../components/separator-item';
import {UserItem} from '../components/user-item';
import {UserItemResponseNodes} from '../modules/users/graphql/type-query';
import {useAuth} from '../modules/auth/hooks/use-auth';
import {USERS_QUERY} from '../modules/users';
import {CustomButtonLink} from '../components/custom-button-link/custom-button-link';
import {Navigation} from 'react-native-navigation';
import {NavigationDefaultProps, SCREENS} from '../navigations';
import {HeaderComponent} from '../components/header';

const USERS_LIMIT = 20;

export function HomeScreen(props: NavigationDefaultProps) {
  const renderUser = ({item}: ListRenderItemInfo<UserItemResponseNodes>) => {
    function goToUserDetailsScreen(user: UserItemResponseNodes) {
      Navigation.push(props.componentId, {
        component: {
          name: SCREENS.fullUser.name,
          passProps: {user},
        },
      });
    }
    return <UserItem onTap={() => goToUserDetailsScreen(item)} user={item} />;
  };

  const [users, setUsers] = useState<UserItemResponseNodes[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const {signOut} = useAuth();

  const {loading} = useQuery(USERS_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {data: {limit: USERS_LIMIT, offset}},
    onCompleted: data => {
      setHasNextPage(data.users.pageInfo.hasNextPage);
      setUsers(prev => {
        if (offset === 0) {
          return data.users.nodes;
        }
        return [...prev, ...data.users.nodes];
      });
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
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={SeparatorItem}
        ListHeaderComponent={HeaderComponent}
        keyExtractor={item => item.id}
        data={users}
        onEndReachedThreshold={0.3}
        onEndReached={fetchNewUsers}
        renderItem={renderUser}
        refreshing={loading}
        onRefresh={() => {
          setOffset(0);
        }}>
        <CustomButtonLink>Mostrar detalhes</CustomButtonLink>
      </FlatList>

      <CustomButtonLink onPress={goToSingUpScreen}>
        Cadastrar Usuário
      </CustomButtonLink>

      <CustomButton text="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    maxWidth: 150,
    maxHeight: 150,
  },
  title: {
    color: '#6d50f1',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
