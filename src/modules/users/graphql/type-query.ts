export interface UserListResponseNodes {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
}

interface PageInfo {
  hasNextPage: boolean;
  limit: number;
  offset: number;
  hasPreviousPage: boolean;
}

export interface UserListResponse {
  users: {
    nodes: UserListResponseNodes[];
    count: number;
    pageInfo: PageInfo;
  };
}
