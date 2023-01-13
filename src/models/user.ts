export interface User {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
}

interface QueryDataPageInfo {
  hasNextPage: boolean;
  limit: number;
  offset: number;
  hasPreviousPage: boolean;
}

export interface QueryDataCount {
  count: number;
}
export interface QueryData {
  users: {
    nodes: User[];
    count: QueryDataCount;
    pageInfo: QueryDataPageInfo[];
  };
}

export interface QueryResponse {
  data: QueryData;
}
