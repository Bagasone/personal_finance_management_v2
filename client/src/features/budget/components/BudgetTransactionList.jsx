import { cn, formatCurrency, formatDate } from "../../../utils";
import { labelCategory } from "../../../shared/category";

import EmptyState from "../../../components/EmptyState";

const BudgetTransactionList = ({ expenses }) => {
  if (!expenses || expenses.length === 0)
    return (
      <EmptyState
        title="There is no transaction"
        description="Try to add transaction in Expsense page"
        icon_cls="text-budget-200"></EmptyState>
    );

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-bold">Transaction History</h2>
        <p className="font-normal text-sm text-black-500">
          {expenses.length} transaction
        </p>
      </div>
      <ul className="flex flex-col gap-5">
        {expenses.map((exp) => (
          <BudgetTransactionItem
            key={exp.id}
            data={exp}
          />
        ))}
      </ul>
    </div>
  );
};

const BudgetTransactionItem = ({ data }) => {
  return (
    <li
      className={cn(
        "flex justify-between items-center",
        "rounded-lg border-2 px-5 py-3",
        "bg-black-50 shadow-neo-lg shadow-black-900 border-black-900",
      )}>
      <div className="flex flex-col justify-center">
        <p className="text-base text-black-900 font-medium">{data.description}</p>
        <p className="text-xs text-black-600">
          {formatDate(data.date, { month: "short" })}
        </p>
      </div>
      <p className="text-base text-budget-500 font-semibold">
        {formatCurrency(data.amount)}
      </p>
    </li>
  );
};

export default BudgetTransactionList;
