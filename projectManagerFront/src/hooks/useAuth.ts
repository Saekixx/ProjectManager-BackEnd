import { login } from "@/service/User/AuthService";
import { authContext, type EstadoAuth } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useContext(authContext);

  if (!auth) {
    throw new Error("useAuth debe usarse dentro de StateCompo");
  }

  const { estadoAuth, setEstadoAuth } = auth;

  const handleLogin = async (email: string, password: string) => {
    setError(null);

    try {
      const res = await login(email, password);

      if (res.status === 200) {
        localStorage.setItem("token", res.data);
        const nextAuthState: EstadoAuth = {
          status: res.status,
          message: res.message || "Inicio de sesión correcto",
          data: res.data,
        };

        setEstadoAuth(nextAuthState);
        navigate("/dashboard");
      } else {
        setError(res.message || "Credenciales incorrectas");
      }
    } catch (error: string | unknown) {
      console.error("Login error catch:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error inesperado";
      setError(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setEstadoAuth({ status: 0, message: "", data: "" });
    navigate("/login");
  };

  return { handleLogin, handleLogout, error, estadoAuth, setEstadoAuth };
}
