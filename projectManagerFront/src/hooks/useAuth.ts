import { login } from "@/service/User/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setError(null);

    try {
      const res = await login(email, password);

      if (res.status === 200) {
        navigate("/dashboard");
        localStorage.setItem("token", res.data);
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
  return { handleLogin, error };
}
