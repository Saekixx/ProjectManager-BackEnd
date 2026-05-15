import type { User } from "./user";

export interface Proyecto {
  id: number;
  name: string;
  description: string;
  leaderId: User;
  memberIds: User[];
  create_at?: string;
  update_at?: string;
}

export interface ProyectoRequest {
  name: string;
  description: string;
  leaderId: number;
  memberIds: number[];
}
