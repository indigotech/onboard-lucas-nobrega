import {client} from '../../App';
import {loginMutation} from '../api/graphql';

export interface AuthDataSimple {
  email: string;
  password: string;
}

interface AuthData {
  login: {
    token: string;
    __typename?: string;
  };
}

async function signIn(email: string, password: string): Promise<AuthData> {
  const resp = await client.mutate({
    mutation: loginMutation,
    variables: {data: {email, password}},
  });
  return resp.data.login;
}

export const authService = {signIn};
