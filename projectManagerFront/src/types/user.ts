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

export interface Rol {
  id: number;
  name: string;
  description: string;
}
