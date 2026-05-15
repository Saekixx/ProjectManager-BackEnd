import { useState } from "react";
import { authContext, type EstadoAuth } from "./AuthContext";

export function StateCompo({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  const [estadoAuth, setEstadoAuth] = useState<EstadoAuth>({
    status: token ? 200 : 0,
    message: token ? "Sesión activa" : "",
    data: token ?? "",
  });

  return (
    <authContext.Provider value={{ estadoAuth, setEstadoAuth }}>
      {children}
    </authContext.Provider>
  );
}
