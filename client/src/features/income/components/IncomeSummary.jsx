import { INCOME_SOURCES } from "../../../constants";

import { calculate, percent } from "../../../utils/calculate";
import { labelSource } from "../../../utils/label";
import { formatDate, formatCurrency } from "../../../utils/formatter";
import ProgressBar from "../../../components/ProgressBar";

const IncomeSummary = ({ data, filters }) => {
  const option = { year: "numeric", month: "long" };

  const TotalIncome = calculate(data, "amount");
  const FilterMonth = new Date(`${filters.month}-01`);
  const Label = labelSource(filters.sourceId, "All Source");

  return (
    <div className="box flex flex-col gap-3 text-xl w-full">
      <h2 className="text-xl font-bold">Income Summary</h2>
      <div className="box flex flex-col justify-center gap-3 px-3 py-1">
        <h3 className="text-lg font-bold">Total Income in {Label}</h3>
        <p className="text-xl font-bold">{formatCurrency(TotalIncome)}</p>
        <span className="text-sm text-black-700">{formatDate(FilterMonth, option)}</span>
      </div>
      <div className="box text-lg font-bold">Comparasion Month</div>
      <div className="box flex flex-col gap-3">
        <h3 className="text-lg font-bold">Breakdown by Source</h3>
        <div className="h-full overflow-scroll scrollbar-none">
          {INCOME_SOURCES.map((i) => (
            <IncomeSourceDetail
              key={i.id}
              data={data}
              total={TotalIncome}
              label={i.label}
              id={i.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const IncomeSourceDetail = ({ data, total, label, id }) => {
  const TotalSource = calculate(data, "amount", { key: "sourceId", value: id });
  const PercentSource = percent(TotalSource, total);

  return (
    <div>
      <div className="flex justify-between items-center gap-3">
        <p className="text-base font-bold">{label}</p>
        <p className="flex items-center gap-3">
          <span className="text-base font-bold text-income-500">
            {formatCurrency(TotalSource)}
          </span>
          <span className="text-sm text-black-500">{PercentSource}</span>
        </p>
      </div>
      <ProgressBar
        fill={PercentSource}
        color="bg-income-500"
      />
    </div>
  );
};

export default IncomeSummary;
