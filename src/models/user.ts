export type User = {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
};

export interface QueryDataNodes {
  role: string;
  phone: string;
  name: string;
  id: string;
  email: string;
  birthDate: string;
}

interface QueryDataPageInfo {
  hasNextPage: boolean;
  limit: number;
  offset: number;
  hasPreviousPage: boolean;
}

export interface QueryData {
  users: {
    nodes: QueryDataNodes[];
    count: number;
    pageInfo: QueryDataPageInfo[];
  };
}

export interface QueryResponse {
  data: QueryData;
}
