import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import Logout from "../components/Logout";
import DashBoardLayout from "../dashborad/DashboardLayout";
import Dashboard from "../dashborad/Dashboard";
import ProtectedRoute from "./protectedRouter";

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
    element: <DashBoardLayout />,
    children: [
      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
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
