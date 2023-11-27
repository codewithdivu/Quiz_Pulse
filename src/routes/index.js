import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import NotFound from "../pages/Page404";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import AdminLayout from "../layouts/admin/AdminLayout";

export const router = createBrowserRouter([
  { path: "*", element: <Navigate to="/not-found" replace /> },
  {
    path: "not-found",
    element: <NotFound />,
  },

  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        element: <Navigate to="login" replace />,
        index: true,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        element: <Navigate to="home" replace />,
        index: true,
      },
      { path: "home", element: <h1>home page</h1> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        element: <Navigate to="home" replace />,
        index: true,
      },
      { path: "home", element: <h1>admin home page</h1> },
    ],
  },
]);
