import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  } else if (isAuthenticated && user.role === "user") {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}
