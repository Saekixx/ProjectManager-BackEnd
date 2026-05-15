import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = () => {
  const { estadoAuth } = useAuth();

  if (estadoAuth.status !== 200 || !estadoAuth.data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
