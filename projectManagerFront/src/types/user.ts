export interface User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  create_at?: string;
  update_at?: string;
  rol: Rol;
}

export interface UserRequest {
  username: string;
  email: string;
  password: string;
  fullname: string;
  rolId: number;
}

export interface Rol {
  id: number;
  name: string;
  description: string;
}
