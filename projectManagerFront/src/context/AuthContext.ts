import { createContext, type Dispatch, type SetStateAction } from "react";

export interface EstadoAuth {
  status: number;
  message: string;
  data: string;
}

interface AuthContextType {
  estadoAuth: EstadoAuth;
  setEstadoAuth: Dispatch<SetStateAction<EstadoAuth>>;
}

export const authContext = createContext<AuthContextType | undefined>(
  undefined,
);
