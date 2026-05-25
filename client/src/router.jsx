import { createBrowserRouter } from "react-router";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ExpensePage from "./pages/ExpensePage";
import IncomePage from "./pages/IncomePage";
import DebtPage from "./pages/DebtPage";
import BudgetPage from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "expenses", element: <ExpensePage /> },
          { path: "incomes", element: <IncomePage /> },
          { path: "debts", element: <DebtPage /> },
          { path: "budgets", element: <BudgetPage /> },
        ],
      },
    ],
  },
]);

export default router;
