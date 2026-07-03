import { calculate } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";
import { labelCategory } from "../../../utils/label";

const ExpenseSummary = ({ data, categoryId }) => {
  const TotalSpent = calculate(data);
  const Label = labelCategory(categoryId, "All Category");

  return (
    <div className="flex justify-start items-center gap-1 text-xl max-h-[10%]">
      Total Expense Bulan Ini{Label ? ` (${Label}):` : ":"}
      <span className="font-bold">{formatCurrency(TotalSpent)}</span>
    </div>
  );
};

export default ExpenseSummary;
