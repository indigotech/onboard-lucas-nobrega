import {useQuery} from '@apollo/client';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {CustomButton} from '../../../../components/custom-buttom/custom-button';
import {UserDetails} from '../../../../components/user-datails/user-datails';
import {NavigationDefaultProps} from '../../../../navigations';
import {FULL_USER_QUERY} from '../../../users/graphql/query-full-user';
import Logo from '../../../../assets/images/logo.png';
import {ContainerUserDetails} from './user-details.style';
import {TitleHeader} from '../../../../components/title-header/title-header.styles';
import {LogoTaq} from '../../../../components/logo-taq/logo-taq.styles';

export function UserDetailsScreen(props: NavigationDefaultProps) {
  const {loading, data} = useQuery(FULL_USER_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {userId: props.user?.id},
  });

  function goBack() {
    Navigation.pop(props.componentId);
  }

  return (
    <ContainerUserDetails>
      <LogoTaq source={Logo} resizeMode="contain" />
      <TitleHeader>Dados Completos</TitleHeader>
      {loading && <ActivityIndicator size="large" color="black" />}
      {!!data?.user && (
        <UserDetails
          id={data.user.id}
          name={data.user.name}
          birthDate={data.user.birthDate}
          email={data.user.email}
          phone={data.user.phone}
          role={data.user.role}
          key={data.user.id}
        />
      )}
      <CustomButton text="Voltar para Lista" onPress={goBack} />
    </ContainerUserDetails>
  );
}
