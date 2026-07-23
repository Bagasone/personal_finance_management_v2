export const EXPENSE_CATEGORIES = [
  { id: "food", label: "Food & Drink" },
  { id: "transport", label: "Transport" },
  { id: "housing", label: "Housing" },
  { id: "health", label: "Health" },
  { id: "entertainment", label: "Entertainment" },
  { id: "shopping", label: "Shopping" },
  { id: "education", label: "Education" },
  { id: "other", label: "Other" },
];

export const INCOME_SOURCES = [
  { id: "salary", label: "Salary" },
  { id: "freelance", label: "Freelance" },
  { id: "revenue", label: "Revenue" },
  { id: "bonus", label: "Bonus" },
  { id: "dividend", label: "Dividend" },
  { id: "interest", label: "Interest" },
  { id: "other", label: "Other" },
];

export const PAYMENT_STATUS = Object.freeze({
  ACTIVE: "active",
  PAID_OFF: "paid_off",
});

export const DEBT_TYPES = Object.freeze({
  OWE: "owe",
  OWED: "owed",
});

export const SIDEBAR_MENU = [
  { path: "/expenses", icon: "expenses", label: "Expenses", color: "expense" },
  { path: "/incomes", icon: "incomes", label: "Incomes", color: "income" },
  { path: "/", icon: "dashboard", label: "Dashboard", color: "dashboard" },
  { path: "/budgets", icon: "budgets", label: "Budgets", color: "budget" },
  { path: "/debts", icon: "debts", label: "Debts", color: "debt" },
];

export const BG_COLORS = {
  expense: "bg-expense-500",
  income: "bg-income-500",
  budget: "bg-budget-500",
  debt: "bg-debt-500",
  dashboard: "bg-dashboard-500",
  fallback: "bg-black-500",
};

export const TEXT_COLORS = {
  expense: "text-expense-400",
  income: "text-income-400",
  budget: "text-budget-400",
  debt: "text-debt-400",
  dashboard: "text-dashboard-400",
  fallback: "text-black-400",
};

// constants — semantic
export const TREND_COLORS = {
  growth: "text-emerald-400", // pakai scale hijau emerald sebagai representasi "baik" atau keuangan growth
  decline: "text-rose-400", // pakai scale merah rose sebagai representasi "buruk" atau keuangan decline
  flat: "text-black-400", // pakai scale hitam sebagai representasi "stabil" atau keuangan flat
};

export const KEY_AUTH = "auth";
