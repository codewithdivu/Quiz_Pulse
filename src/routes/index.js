import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import NotFound from "../pages/Page404";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import AdminLayout from "../layouts/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CategoryList from "../pages/admin/dashboard/category/CategoryList";
import CreateCategory from "../pages/admin/dashboard/category/CreateCategory";
import QuizList from "../pages/admin/dashboard/quiz/QuizList";
import CreateQuiz from "../pages/admin/dashboard/quiz/CreateQuiz";
import CreateQuestion from "../pages/admin/dashboard/question/CreateQuestion";
import QuestionList from "../pages/admin/dashboard/question/QuestionList";
import QuizDashboard from "../pages/dashboard/QuizDashboard";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";

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
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: "register",
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <GuestGuard>
            <ForgotPassword />
          </GuestGuard>
        ),
      },
      {
        path: "reset-password",
        element: (
          <GuestGuard>
            <ResetPassword />
          </GuestGuard>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),

    children: [
      {
        element: <Navigate to="home" replace />,
        index: true,
      },
      { path: "home", element: <QuizDashboard /> },
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
      { path: "home", element: <AdminDashboard /> },
      {
        path: "quiz",
        children: [
          { path: "list", element: <QuizList /> },
          { path: "new", element: <CreateQuiz /> },
        ],
      },
      {
        path: "question",
        children: [
          { path: "list", element: <QuestionList /> },
          { path: "new", element: <CreateQuestion /> },
        ],
      },
      {
        path: "category",
        children: [
          { path: "list", element: <CategoryList /> },
          { path: "new", element: <CreateCategory /> },
        ],
      },
    ],
  },
]);
