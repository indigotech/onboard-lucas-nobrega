import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {CustomButton} from '../../components/custom-buttom/custom-button';
import {SeparatorItem} from '../../components/separator-item/separator-item';
import {UserItem} from '../../components/user-item/user-item';
import {UserItemResponseNodes} from '../../modules/users/graphql/type-query';
import {useAuth} from '../../modules/auth/hooks/use-auth';
import {USERS_QUERY} from '../../modules/users';
import {CustomButtonLink} from '../../components/custom-button-link/custom-button-link';
import {Navigation} from 'react-native-navigation';
import {NavigationDefaultProps, SCREENS} from '../../navigations';
import {Header} from '../../components/header/header';
import * as Styled from './home.styles';

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
    <Styled.Container>
      <FlatList
        ItemSeparatorComponent={SeparatorItem}
        ListHeaderComponent={Header}
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
    </Styled.Container>
  );
}
