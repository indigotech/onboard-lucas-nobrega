import {gql} from '@apollo/client';

export const USERS_QUERY = gql`
  query Query($data: PageInput) {
    users(data: $data) {
      nodes {
        name
        email
        id
        phone
        birthDate
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
