import {Alert} from 'react-native';
import {client} from '../../App';
import {loginMutation} from '../api/graphql';
import {GraphQLServerError} from '../global/types/login-response-error';

export async function consultLogin(email: string, password: string) {
  try {
    const result = await client.mutate({
      mutation: loginMutation,
      variables: {data: {email, password}},
    });
    console.log(JSON.stringify(result, null, 2));
    console.warn('Sign in');
  } catch (error) {
    const graphQLError = error as GraphQLServerError;
    console.log(JSON.stringify(error, null, 2));
    Alert.alert(graphQLError.graphQLErrors[0].message);
  }
}
