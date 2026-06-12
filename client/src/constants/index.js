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

export const KEY_AUTH = "auth";

export const PROFILE_IMAGE =
  "https://cdn.jsdelivr.net/gh/alohe/avatars@master/png/toon_1.png";
