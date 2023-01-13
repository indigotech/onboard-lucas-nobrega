export interface User {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: 'admin' | 'user';
}
