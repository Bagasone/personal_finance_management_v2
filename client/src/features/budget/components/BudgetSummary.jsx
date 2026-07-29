import { cn, calculate, formatCurrency, formatDate } from "../../../utils";

import { TbMoneybag } from "react-icons/tb";

const BudgetSummary = ({ data, data_expenses, month }) => {
  const active_budgets = data.map((d) => d.category_id);
  const active_expenses = data_expenses.filter((d) =>
    active_budgets.includes(d.category_id),
  );

  const total_limit = calculate(data, "limit");
  const total_spent = calculate(active_expenses, "amount");

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-1",
        "rounded-lg border px-5 py-3",
        "bg-black-900 shadow-neo-lg shadow-black-800 border-black-800",
      )}>
      <div className="flex justify-between items-center w-full">
        <p className="font-medium text-sm text-black-400">Total Limit Budget</p>
        <p
          className={cn(
            "flex justify-center items-center gap-1",
            "border rounded-full px-1.5 py-0.5",
            "text-budget-300 bg-budget-400/10 border-budget-400",
            "font-medium text-xxs",
          )}>
          {formatDate(`${month}-01`, { month: "short", day: null })}
          <TbMoneybag className="size-3" />
        </p>
      </div>
      <div className="flex items-center w-full overflow-hidden">
        <p className="font-bold text-3xl text-budget-400 truncate">
          {formatCurrency(total_limit)}
        </p>
      </div>
      <div className="flex items-center gap-1 w-full text-xxs">
        <p className="text-black-400">
          Terpakai{" "}
          <span className="text-black-200 font-medium">
            {formatCurrency(total_spent)}
          </span>{" "}
          dari total limit
        </p>
      </div>
    </div>
  );
};
export default BudgetSummary;
