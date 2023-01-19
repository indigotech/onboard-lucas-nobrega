export interface UserItemResponseNodes {
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

export interface UserItemResponse {
  users: {
    nodes: UserItemResponseNodes[];
    count: number;
    pageInfo: PageInfo;
  };
}
