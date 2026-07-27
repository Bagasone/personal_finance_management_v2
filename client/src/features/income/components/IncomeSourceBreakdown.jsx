import { cn, calculate, calculatePercent, formatCurrency } from "../../../utils";

import { INCOME_SOURCES } from "../../../constants";

import ProgressBar from "../../../components/ProgressBar";

const IncomeSourceBreakdown = ({ data }) => {
  const total = calculate(data, "amount");

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-bold px-3">Breakdown by Source</h3>
      <div
        className={cn(
          "flex flex-col gap-3",
          "w-full max-h-28 overflow-y-auto scrollbar-none",
          "rounded-lg border-2",
          "bg-black-50 shadow-neo-lg shadow-black-900 border-black-900",
        )}>
        {INCOME_SOURCES.map((i) => (
          <IncomeSourceDetail
            key={i.id}
            data={data}
            total_income={total}
            label={i.label}
            id={i.id}
          />
        ))}
      </div>
    </div>
  );
};

const IncomeSourceDetail = ({ data, total_income, label, id }) => {
  const total = calculate(data, "amount", { key: "source_id", value: id });
  const percent = calculatePercent(total, total_income);

  return (
    <div className="w-full px-3 py-1">
      <div className="flex justify-between items-center gap-3">
        <p className="text-base font-medium">{label}</p>
        <p className="flex items-center gap-5">
          <span className="truncate text-base font-bold text-black-900">
            {formatCurrency(total, { notation: "compact" })}
          </span>
          <span className="text-sm text-black-500">({percent}%)</span>
        </p>
      </div>
      <ProgressBar
        fill={percent}
        color="bg-income-400"
      />
    </div>
  );
};

export default IncomeSourceBreakdown;
