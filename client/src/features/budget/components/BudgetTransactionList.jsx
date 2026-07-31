import { cn, labelCategory, formatCurrency, formatDate } from "../../../utils";

import { TbArticleOff } from "react-icons/tb";

import EmptyState from "../../../components/EmptyState";

const BudgetTransactionList = ({ data, data_expenses }) => {
  const { category_id } = data;
  const active_expenses = data_expenses.filter((d) => d.category_id === category_id);

  if (!active_expenses || active_expenses.length === 0)
    return (
      <EmptyState
        title="There is no transaction"
        description="Try to add transaction in Expsense page"
        Icon={TbArticleOff}
        icon_cls="text-budget-200"></EmptyState>
    );

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-bold">Transaction History</h2>
        <p className="font-normal text-sm text-black-500">
          {active_expenses.length} transaction
        </p>
      </div>
      <ul className="flex flex-col gap-5">
        {active_expenses.map((exp) => (
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
