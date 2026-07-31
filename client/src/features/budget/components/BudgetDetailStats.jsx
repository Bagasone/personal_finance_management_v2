import { calculate, calculatePercent, cn, formatCurrency } from "../../../utils";

const BudgetDetailStats = ({ data, data_expenses }) => {
  const { limit, category_id } = data;
  const active_expenses = data_expenses.filter((d) => d.category_id === category_id);

  const total_spent = calculate(active_expenses, "amount");
  const remaining_limit = limit - total_spent;
  const total_transaction = active_expenses.length;
  const average_transaction = total_transaction > 0 ? total_spent / total_transaction : 0;

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
          {formatCurrency(remaining_limit, { notation: "compact" })}
        </p>
      </div>
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          "border-2 rounded-lg px-3 py-1",
          "shadow-neo-md shadow-black-900 border-black-900",
        )}>
        <p className="text-xs text-black-600">Transactions</p>
        <p className="text-base text-black-900 font-bold">{total_transaction}x</p>
      </div>
      <div
        className={cn(
          "flex flex-col justify-center items-center",
          "border-2 rounded-lg px-3 py-1",
          "shadow-neo-md shadow-black-900 border-black-900",
        )}>
        <p className="text-xs text-black-600">Avg / Trans</p>
        <p className="text-base text-black-900 font-bold">
          {formatCurrency(average_transaction, { notation: "compact" })}
        </p>
      </div>
    </div>
  );
};

export default BudgetDetailStats;
