export const EXPENSE_CATEGORIES = [
  { id: "cat_food", name: "Food & Drink" },
  { id: "cat_transport", name: "Transport" },
  { id: "cat_housing", name: "Housing" },
  { id: "cat_health", name: "Health" },
  { id: "cat_entertainment", name: "Entertainment" },
  { id: "cat_shopping", name: "Shopping" },
  { id: "cat_education", name: "Education" },
  { id: "cat_other", name: "Other" },
];

export const DEBT_TYPES = Object.freeze({
  OWE: "owe",
  OWED: "owed",
});

export const PAYMENT_STATUS = Object.freeze({
  ACTIVE: "active",
  PAID_OFF: "paid_off",
});

export const INCOME_SOURCES = Object.freeze({
  SALARY: "salary",
  FREELANCE: "freelance",
  OTHER: "other",
});

export const MENU_ITEMS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/expenses", label: "Expenses" },
  { to: "/incomes", label: "Incomes" },
  { to: "/debts", label: "Debts" },
  { to: "/budgets", label: "Budgets" },
];

export const KEY_AUTH = "auth";
