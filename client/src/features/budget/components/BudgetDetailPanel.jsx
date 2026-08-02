import {
  cn,
  calculate,
  formatCurrency,
  formatDate,
  calculatePercent,
} from "../../../utils";
import { statusIndicator } from "../utils";
import { iconCategory, labelCategory } from "../../../shared/category";

import { STATUS_COLORS_DARK } from "../constants/color";

import ProgressBar from "../../../components/ProgressBar";

const BudgetDetailPanel = ({ data, data_expenses }) => {
  const { limit, month, category_id } = data;

  const active_expenses = data_expenses.filter((d) => d.category_id === category_id);
  const total_spent = calculate(active_expenses, "amount");
  const percent = calculatePercent(total_spent, limit);

  const { status_label, status_key } = statusIndicator(percent);
  const label = labelCategory(category_id);
  const Icon = iconCategory(category_id);

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-3",
        "rounded-lg border px-5 py-3",
        "bg-black-900 shadow-neo-lg shadow-black-800 border-black-800",
      )}>
      <div className="flex justify-between items-center">
        <p
          className={cn(
            "flex items-center gap-1",
            "font-semibold text-base text-black-200",
          )}>
          <span
            className={cn(
              "border rounded-sm p-1",
              "bg-black-800 text-black-100 border-black-600",
            )}>
            <Icon className="size-5" />
          </span>
          {label}
        </p>
        <p
          className={cn(
            "flex justify-center items-center gap-1",
            "border rounded-full px-1.5 py-0.5",
            "font-medium text-xxs",
            STATUS_COLORS_DARK[status_key].badge,
          )}>
          {status_label} - {percent}%
        </p>
      </div>
      <div className={cn("flex flex-col justify-center gap-1", "w-full overflow-hidden")}>
        <p
          className={cn(
            "font-bold text-3xl truncate",
            STATUS_COLORS_DARK[status_key].text,
          )}>
          {formatCurrency(total_spent)}
        </p>
        <p className={cn("flex items-center gap-1", "text-xs text-black-400")}>
          Dari
          <span className="text-black-200 font-medium">{formatCurrency(limit)}</span>
          limit
        </p>
      </div>
      <ProgressBar
        fill={percent}
        cls={cn("h-3", STATUS_COLORS_DARK[status_key].bar)}
      />
    </div>
  );
};

export default BudgetDetailPanel;
