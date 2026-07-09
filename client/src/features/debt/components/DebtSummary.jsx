import { calculate } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";

const DebtSummary = ({ data }) => {
  const total = calculate(data, "remainingAmount");

  return (
    <div className="flex justify-start items-center gap-1 text-xl max-h-[10%]">
      Total Debt Bulan Ini:
      <span className="font-bold">{formatCurrency(total)}</span>
    </div>
  );
};

export default DebtSummary;
