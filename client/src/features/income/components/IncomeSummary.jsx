import {
  calculate,
  calculatePercent,
  formatCurrency,
  formatDate,
  iconSource,
  cn,
  summaryIndicator,
} from "../../../utils";

import { TREND_COLORS } from "../../../constants";
import { TbCashBanknote } from "react-icons/tb";

const IncomeSummary = ({ data, prev_data, filters }) => {
  const { month, source_id } = filters;

  const Icon = iconSource(source_id, TbCashBanknote);

  const curr_total = calculate(data, "amount");
  const prev_total = calculate(prev_data, "amount");

  const total_diff = curr_total - prev_total;
  const percent = calculatePercent(total_diff, prev_total);

  const { label, Icon: IconSummary } = summaryIndicator(percent);
  const color = percent > 0 ? "positive" : percent < 0 ? "negative" : "flat";

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-2",
        "rounded-lg border px-5 py-3",
        "bg-black-900 shadow-neo-lg shadow-black-800 border-black-800",
      )}>
      <div className="flex justify-between items-center w-full">
        <p className="text-base font-medium text-black-200">Total Incomes</p>
        <p
          className={cn(
            "flex justify-center items-center gap-1",
            "border rounded-full px-1.5 py-0.5",
            "border-income-400 text-income-300 bg-income-400/10",
            "text-xxs font-medium ",
          )}>
          {formatDate(`${month}-01`, { month: "short", day: null })}
          <Icon className="size-3" />
        </p>
      </div>
      <div className={cn("flex flex-col justify-center gap-1", "w-full overflow-hidden")}>
        <p className="font-bold text-4xl text-income-400 truncate">
          {formatCurrency(curr_total)}
        </p>
        <p className={cn("flex items-center gap-1", "text-xs text-black-400")}>
          <span className={cn("inline-flex items-center", TREND_COLORS[color])}>
            <IconSummary />
            {percent !== null ? `${percent}%` : ""}
          </span>
          {label}
        </p>
      </div>
    </div>
  );
};
export default IncomeSummary;
