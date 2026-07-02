import { EXPENSE_CATEGORIES, INCOME_SOURCES } from "../constants";

export const labelCategory = (id, fallback = "Other") => {
  return (
    EXPENSE_CATEGORIES.find((c) => c.id === id)?.label ?? fallback
  );
};

export const labelSource = (id, fallback = "Other") => {
  return INCOME_SOURCES.find((s) => s.id === id)?.label ?? fallback
};
