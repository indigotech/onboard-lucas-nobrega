import {gql, useMutation} from '@apollo/client';
import {User} from '../../../../models/user';

const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        birthDate
        email
        id
        name
        phone
        role
      }
    }
  }
`;

interface LoginResponse {
  login: {
    token: string;
    user: User;
  };
}

export const useLoginMutation = () => {
  return useMutation<LoginResponse>(LOGIN_MUTATION);
};
