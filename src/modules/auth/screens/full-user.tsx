import {useQuery} from '@apollo/client';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {CustomButton} from '../../../components/custom-button';
import {UserDetails} from '../../../components/user-datails';
import {NavigationDefaultProps} from '../../../navigations';
import {FULL_USER_QUERY} from '../../users/graphql/query-full-user';
import Logo from '../../../assets/images/logo.png';
import {SeparatorItem} from '../../../components/separator-item';

export function FullUserScreen(props: NavigationDefaultProps) {
  const {loading, data} = useQuery(FULL_USER_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {userId: props.user?.id},
  });

  function goBack() {
    Navigation.pop(props.componentId);
  }

  const {height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Dados Completos</Text>
      <SeparatorItem />
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
      <CustomButton text="Sair" onPress={goBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: '40%',
    maxWidth: 150,
    maxHeight: 150,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6d50f1',
  },
  separator: {
    marginBottom: 'auto',
  },
});
