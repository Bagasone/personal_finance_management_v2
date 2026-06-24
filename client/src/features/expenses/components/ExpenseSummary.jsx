import { calculate } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";

import { EXPENSE_CATEGORIES } from "../../../constants";

const ExpenseSummary = ({ data, categoryId }) => {
  const totalSpent = calculate(data);
  const categoryLabel = EXPENSE_CATEGORIES.find((c) => c.id === categoryId)?.label;

  return (
    <div className="flex justify-start items-center gap-1 text-xl max-h-[10%]">
      Total Expense Bulan Ini{categoryLabel ? ` (${categoryLabel}):` : ":"}
      <span className="font-bold">{formatCurrency(totalSpent)}</span>
    </div>
  );
};

export default ExpenseSummary;
