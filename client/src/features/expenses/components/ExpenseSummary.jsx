import calculateSpent from "../utils/calculateSpent";
import formatCurrency from "../../../utils/formatCurrency";

const ExpenseSummary = ({ data }) => {
  const totalSpent = calculateSpent(data);

  return (
    <div className="flex justify-start items-center gap-1 text-xl">
      Total Expense Bulan Ini:
      <span className="font-bold">{formatCurrency(totalSpent)}</span>
    </div>
  );
};

export default ExpenseSummary;
