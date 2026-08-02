import { cn, calculate, calculatePercent, formatCurrency } from "../../../utils";

import { INCOME_SOURCES } from "../../../constants";

import ProgressBar from "../../../components/ProgressBar";

const IncomeSourceBreakdown = ({ data }) => {
  const income = data ?? [];
  const total = calculate(income, "amount");
  const active_source = INCOME_SOURCES.filter((source) =>
    income.some((d) => d.source_id === source.id),
  );

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold px-3">Breakdown by Source</h3>
      <div
        className={cn(
          "flex flex-col gap-3",
          "w-full max-h-28 overflow-y-auto scrollbar-none",
          "rounded-lg border-2",
          "bg-black-50 shadow-neo-lg shadow-black-900 border-black-900",
        )}>
        {active_source.map((i) => (
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
        <p className="text-base font-semibold text-black-800">{label}</p>
        <p className="flex items-center gap-5">
          <span className="truncate text-base font-semibold text-black-900">
            {formatCurrency(total)}
          </span>
          <span className="text-sm text-black-500">({percent}%)</span>
        </p>
      </div>
      <ProgressBar
        fill={percent}
        cls="h-3 bg-income-400"
      />
    </div>
  );
};

export default IncomeSourceBreakdown;
