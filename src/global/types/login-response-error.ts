export interface GraphQLServerError {
  graphQLErrors: GraphQLError[];
  name: string;
  message: string;
}

interface GraphQLError {
  message: string;
  code: number;
  name: string;
}
