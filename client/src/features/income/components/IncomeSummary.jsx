import { calculate, calculatePercent } from "../../../utils/calculate";
import { labelSource } from "../../../utils/label";
import { formatDate, formatCurrency } from "../../../utils/formatter";

import { INCOME_SOURCES } from "../../../constants";

import ProgressBar from "../../../components/ProgressBar";

const IncomeSummary = ({ data, filters }) => {
  const filter_month = new Date(`${filters.month}-01`);
  const total = calculate(data, "amount");
  const label = labelSource(filters.source_id, "All Source");

  return (
    <div className="box flex flex-col gap-3 text-xl w-full">
      <h2 className="text-xl font-bold">Income Summary</h2>
      <div className="box flex flex-col justify-center gap-3 px-3 py-1">
        <h3 className="text-lg font-bold">Total Income in {label}</h3>
        <p className="text-xl font-bold">{formatCurrency(total)}</p>
        <span className="text-sm text-black-700">
          {formatDate(filter_month, { month: "long" })}
        </span>
      </div>
      <div className="box text-lg font-bold">Comparasion Month</div>
      <div className="box flex flex-col gap-3">
        <h3 className="text-lg font-bold">Breakdown by Source</h3>
        <div className="h-full overflow-scroll scrollbar-none">
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
    </div>
  );
};

const IncomeSourceDetail = ({ data, total_income, label, id }) => {
  const total = calculate(data, "amount", { key: "source_id", value: id });
  const percent = calculatePercent(total, total_income);

  return (
    <div>
      <div className="flex justify-between items-center gap-3">
        <p className="text-base font-bold">{label}</p>
        <p className="flex items-center gap-3">
          <span className="text-base font-bold text-income-500">
            {formatCurrency(total)}
          </span>
          <span className="text-sm text-black-500">{percent}</span>
        </p>
      </div>
      <ProgressBar
        fill={percent}
        color="bg-income-500"
      />
    </div>
  );
};

export default IncomeSummary;
