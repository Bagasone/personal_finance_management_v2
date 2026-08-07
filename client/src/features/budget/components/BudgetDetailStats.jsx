import { calculate, calculatePercent, cn, formatCurrency } from "../../../utils";

const BudgetDetailStats = ({ budget, expenses, spent }) => {
  const remaining = budget.limit - spent;
  const transaction_count = expenses.length;
  const average = spent / transaction_count;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          "border-2 rounded-lg px-3 py-1",
          "shadow-neo-md shadow-black-900 border-black-900",
          "overflow-hidden w-full",
        )}>
        <p className="text-xs text-black-600">Remaining</p>
        <p className="text-base text-black-900 font-bold truncate w-full">
          {formatCurrency(remaining, { notation: "compact" })}
        </p>
      </div>
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          "border-2 rounded-lg px-3 py-1",
          "shadow-neo-md shadow-black-900 border-black-900",
        )}>
        <p className="text-xs text-black-600">Transactions</p>
        <p className="text-base text-black-900 font-bold">{transaction_count}x</p>
      </div>
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          "border-2 rounded-lg px-3 py-1",
          "shadow-neo-md shadow-black-900 border-black-900",
        )}>
        <p className="text-xs text-black-600">Avg / Trans</p>
        <p className="text-base text-black-900 font-bold">
          {formatCurrency(average, { notation: "compact" })}
        </p>
      </div>
    </div>
  );
};

export default BudgetDetailStats;
