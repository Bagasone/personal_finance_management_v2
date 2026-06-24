import { INCOME_SOURCES } from "../../../constants";

import { calculate, percent } from "../../../utils/calculate";
import { formatDate, formatCurrency } from "../../../utils/formatter";

const IncomeSummary = ({ data, filters }) => {
  const option = { year: "numeric", month: "long" };

  const totalIncome = calculate(data);
  const filterMonth = new Date(`${filters.month}-01`);

  const categoryLabel =
    INCOME_SOURCES.find((i) => i.id === filters.sourceId)?.label ?? "All Category";

  return (
    <div className="box flex flex-col gap-3 text-xl w-full">
      <h2 className="text-xl font-bold">Income Summary</h2>
      <div className="box flex flex-col justify-center gap-3 px-3 py-1">
        <h3 className="text-lg font-bold">Total Income in {categoryLabel}</h3>
        <p className="text-xl font-bold">{formatCurrency(totalIncome)}</p>
        <span className="text-sm text-black-700">{formatDate(filterMonth, option)}</span>
      </div>
      <div className="box text-lg font-bold">Comparasion Month</div>
      <div className="box flex flex-col gap-3">
        <h3 className="text-lg font-bold">Breakdown by Source</h3>
        <div className="h-full overflow-scroll scrollbar-none">
          {INCOME_SOURCES.map((i) => (
            <IncomeSourceDetail
              key={i.id}
              data={data}
              total={totalIncome}
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
  const totalSource = calculate(data, { label: "sourceId", value: id });
  const percentSource = percent(totalSource, total);

  return (
    <div>
      <div className="flex justify-between items-center gap-3">
        <p className="text-base font-bold">{label}</p>
        <p className="flex items-center gap-3">
          <span className="text-base font-bold text-income-500">
            {formatCurrency(totalSource)}
          </span>
          <span className="text-sm text-black-500">{percentSource}</span>
        </p>
      </div>
      <div className="flex justify-start items-center rounded-sm bg-black-300 w-full h-3">
        <div
          style={{ width: percentSource }}
          className="rounded-sm h-3 bg-income-500"></div>
      </div>
    </div>
  );
};

export default IncomeSummary;
