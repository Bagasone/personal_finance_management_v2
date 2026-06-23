import calculateSpent from "../utils/calculateSpent";
import formatCurrency from "../../../utils/formatCurrency";

import { EXPENSE_CATEGORIES } from "../../../constants";

const ExpenseSummary = ({ data, categoryId }) => {
  const totalSpent = calculateSpent(data);
  const categoryLabel = EXPENSE_CATEGORIES.find(
    (c) => c.id === categoryId,
  )?.label;

  return (
    <div className="flex justify-start items-center gap-1 text-xl">
      Total Expense Bulan Ini{categoryLabel ? ` (${categoryLabel}):` : ":"}
      <span className="font-bold">{formatCurrency(totalSpent)}</span>
    </div>
  );
};

export default ExpenseSummary;
