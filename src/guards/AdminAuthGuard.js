import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminAuthGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/admin/login" />;
  } else if (isAuthenticated && user.role === "admin") {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/admin/login" />;
  }
}
