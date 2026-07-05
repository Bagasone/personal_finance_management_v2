import { calculate } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";

const BudgetSummary = ({ data }) => {
  const Total = calculate(data, "limit");
  return (
    <div className="flex justify-start items-center gap-1 text-xl max-h-[10%]">
      Total Limit Budget Bulan Ini:
      <span className="font-bold">{formatCurrency(Total)}</span>
    </div>
  );
};

export default BudgetSummary;
