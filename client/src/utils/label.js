import { EXPENSE_CATEGORIES, INCOME_SOURCES } from "../constants";

export const labelCategory = (id) => {
  return (
    EXPENSE_CATEGORIES.find((c) => c.id === id)?.label ?? "Other"
  );
};

export const labelSource = (id) => {
  return INCOME_SOURCES.find((s) => s.id === id)?.label ?? "Other"
};
