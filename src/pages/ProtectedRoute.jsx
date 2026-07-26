import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data?.success) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}