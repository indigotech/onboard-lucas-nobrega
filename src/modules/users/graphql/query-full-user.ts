import {gql} from '@apollo/client';

export const FULL_USER_QUERY = gql`
  query User($userId: ID) {
    user(id: $userId) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
