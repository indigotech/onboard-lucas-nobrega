import {gql} from '@apollo/client';

export const USERS_QUERY = gql`
  query Query($data: PageInput) {
    users(data: $data) {
      nodes {
        id
        name
        phone
        birthDate
        email
        role
      }
      count
      pageInfo {
        hasNextPage
        limit
        offset
        hasPreviousPage
      }
    }
  }
`;
