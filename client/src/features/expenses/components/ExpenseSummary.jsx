import { calculate } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";
import { labelCategory } from "../../../utils/label";

const ExpenseSummary = ({ data, category_id }) => {
  const total = calculate(data, "amount");
  const label = labelCategory(category_id, "All Category");

  return (
    <div className="flex justify-start items-center gap-1 text-xl max-h-[10%]">
      Total Expense Bulan Ini {label ?? label}:
      <span className="font-bold">{formatCurrency(total)}</span>
    </div>
  );
};

export default ExpenseSummary;
