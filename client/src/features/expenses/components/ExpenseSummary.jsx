import {
  calculate,
  calculatePercent,
  formatCurrency,
  iconCategory,
  cn,
  summaryIndicator,
  formatDate,
} from "../../../utils";

import { TEXT_COLORS, TREND_COLORS } from "../../../constants";
import { IoReceiptOutline, IoArrowUp } from "react-icons/io5";

const ExpenseSummary = ({ data, prev_data, filters }) => {
  const { month, category_id } = filters;

  const Icon = iconCategory(category_id, IoReceiptOutline);

  const curr_total = calculate(data, "amount");
  const prev_total = calculate(prev_data, "amount");

  const total_diff = curr_total - prev_total;
  const percent = calculatePercent(total_diff, prev_total);

  const { label, Icon: IconSummary } = summaryIndicator(percent);
  const color = percent > 0 ? "negative" : percent < 0 ? "positive" : "flat";

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-1",
        "rounded-lg border px-5 py-3",
        "bg-black-900 shadow-neo-lg shadow-black-800 border-black-800",
      )}>
      <div className="flex justify-between items-center w-full">
        <p className="font-medium text-sm text-black-400">Total Expenses</p>
        <p
          className={cn(
            "flex justify-center items-center gap-1",
            "border rounded-full px-1.5 py-0.5",
            "text-expense-300 bg-expense-400/10 border-expense-400",
            "font-medium text-xxs",
          )}>
          <Icon />
          {formatDate(`${month}-01`, { month: "short", day: null })}
        </p>
      </div>
      <div className="flex items-center w-full overflow-hidden">
        <p className="font-bold text-3xl text-expense-400 truncate">
          {formatCurrency(curr_total)}
        </p>
      </div>
      <div className="flex items-center gap-1 w-full text-xxs">
        <span className={cn("inline-flex items-center gap-1", TREND_COLORS[color])}>
          <IconSummary />
          <p>{percent !== null ? `${percent}%` : ""}</p>
        </span>
        <p className="text-black-400">{label}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
