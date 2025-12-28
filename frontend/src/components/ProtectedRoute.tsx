import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function ProtectedRoute() {
  const { state } = useAuth();
  const location = useLocation();

  if (state.loading) return <div style={{ padding: 24 }}>Loading...</div>;

  if (!state.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
``
