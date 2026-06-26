import { formatCurrency } from "../../../utils/formatter";

const BudgetSummary = ({ data }) => {
  const total = data ? data.reduce((acc, curr) => acc + curr.limit, 0) : 0;
  return (
    <div className="flex justify-start items-center gap-1 text-xl max-h-[10%]">
      Total Limit Budget Bulan Ini:
      <span className="font-bold">{formatCurrency(total)}</span>
    </div>
  );
};

export default BudgetSummary;
