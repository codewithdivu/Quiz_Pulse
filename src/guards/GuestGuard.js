import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.role === "user") {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
