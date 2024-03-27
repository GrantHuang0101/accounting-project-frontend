import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import Home from "../views/landing/Home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import Logout from "../views/auth/Logout";
import DashBoardLayout from "../layouts/DashboardLayout";
import Dashboard from "../views/dashborad/Dashboard";
import ProtectedRoute from "./protectedRouter";
import Transactions from "../views/dashborad/custom-transacitions/Transactions";
import Analytics from "../views/dashborad/analytics/Analytics";
import CreateTransaction from "../views/dashborad/custom-transacitions/CreateTransaction";
import EditTransaction from "../views/dashborad/custom-transacitions/EditTransaction";
import DeleteTransaction from "../views/dashborad/custom-transacitions/DeleteTransaction";
import Introduction from "../views/landing/Introduction";
import QuickAdd from "../views/dashborad/quick-add/QuickAdd";
import PLManagement from "../views/dashborad/profit-loss-management/PLManagement";
import CashFlowAnalytics from "../views/dashborad/analytics/CashFlowAnalytics";
import CashTransactionDetail from "../views/dashborad/analytics/CashTransactionDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/introduction",
        element: <Introduction />,
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
        path: "/user/analytics",
        element: <Analytics />,
      },
      {
        path: "/user/analytics/cash-flow",
        element: <CashFlowAnalytics />,
      },
      {
        path: "/user/analytics/cash-flow/:id",
        element: <CashTransactionDetail />,
      },

      {
        path: "/user/quick-add-transactions",
        element: <QuickAdd />,
      },

      {
        path: "/user",
        element: <Dashboard />,
      },
      {
        path: "/user/custom-transactions",
        element: <Transactions />,
      },
      {
        path: "/user/custom-transactions/create",
        element: <CreateTransaction />,
      },
      {
        path: "/user/custom-transactions/edit/:id",
        element: <EditTransaction />,
      },
      {
        path: "/user/custom-transactions/delete/:id",
        element: <DeleteTransaction />,
      },

      {
        path: "/user/profit&loss-management",
        element: <PLManagement />,
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
