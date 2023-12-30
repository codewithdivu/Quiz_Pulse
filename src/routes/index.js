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
import AdminLogin from "../pages/auth/AdminLogin";
import AdminAuthGuard from "../guards/AdminAuthGuard";
import AdminGuestGuard from "../guards/AdminGuestGuard";
import QuizPage from "../pages/dashboard/quiz/QuizPage";
import QuizResult from "../pages/dashboard/quiz/QuizResult";
import Profile from "../pages/dashboard/profile/Profile";

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
      { path: "profile", element: <Profile /> },

      {
        path: "test/:quizId",
        element: <QuizPage />,
      },
      {
        path: "test/:quizId/:userId",
        element: <QuizResult />,
      },
    ],
  },

  {
    path: "/auth/admin",
    element: <AuthLayout />,
    children: [
      {
        element: <Navigate to="login" replace />,
        index: true,
      },
      {
        path: "login",
        element: (
          <AdminGuestGuard>
            <AdminLogin />
          </AdminGuestGuard>
        ),
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminAuthGuard>
        <AdminLayout />
      </AdminAuthGuard>
    ),

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
          { path: "edit/:id", element: <CreateQuiz /> },
        ],
      },
      {
        path: "question",
        children: [
          { path: "list", element: <QuestionList /> },
          { path: "new", element: <CreateQuestion /> },
          { path: "edit/:id", element: <CreateQuestion /> },
        ],
      },
      {
        path: "category",
        children: [
          { path: "list", element: <CategoryList /> },
          { path: "new", element: <CreateCategory /> },
          { path: "edit/:id", element: <CreateCategory /> },
        ],
      },
    ],
  },
]);
