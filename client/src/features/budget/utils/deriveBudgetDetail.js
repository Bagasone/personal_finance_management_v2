import { calculate, calculatePercent } from "../../../utils";

export const deriveBudgetDetail = (budget, expenses) => {
  const active_expenses = expenses.filter((e) => e.category_id === budget.category_id);
  const spent = calculate(active_expenses, "amount");
  const percent = calculatePercent(spent, budget.limit);

  return {
    active_expenses,
    spent,
    percent,
  };
};
