import {gql, useMutation} from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;

export interface CreateUserResponse {
  createUser: {
    id: string;
    name: string;
    phone: string;
    birthDate: string;
    email: string;
    role: string;
  };
}

export const useCreateUserMutation = () => {
  return useMutation<CreateUserResponse>(CREATE_USER_MUTATION);
};
