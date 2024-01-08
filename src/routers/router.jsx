import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../layouts/App";
import Home from "../views/Home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import Logout from "../views/auth/Logout";
import DashBoardLayout from "../layouts/DashboardLayout";
import Dashboard from "../views/dashborad/Dashboard";
import ProtectedRoute from "./protectedRouter";
import Transactions from "../views/dashborad/transactions/Transactions";
import Analytics from "../views/dashborad/Analytics";
import CreateTransaction from "../views/dashborad/transactions/CreateTransaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/user",
        element: <Dashboard />,
      },
      {
        path: "/user/transactions",
        element: <Transactions />,
      },
      {
        path: "/user/transactions/create",
        element: <CreateTransaction />,
      },
      {
        path: "/user/analytics",
        element: <Analytics />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
