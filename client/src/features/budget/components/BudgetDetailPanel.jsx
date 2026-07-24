import { cn, formatCurrency, formatDate, labelCategory, calculate } from "../../../utils";

import EmptyState from "../../../components/EmptyState";

const BudgetDetailPanel = ({ data, data_expenses = [] }) => {
  if (!data) return <EmptyState message="Please select one Budget to see a detail" />;

  const label = labelCategory(data.category_id);
  const spent = calculate(data_expenses, "amount", {
    key: "category_id",
    value: data.category_id,
  });
  const remaining = data.limit - spent;
  const quantity = data_expenses.map((e) => e.category_id === data.id).length;
  const average = spent / quantity;
  const expenses = data_expenses.filter((e) => e.category_id === data.category_id);

  return (
    <div className="box flex flex-col gap-3 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{label}</h2>
        <span className="box">
          {formatDate(data.month, { month: "long", day: null })}
        </span>
      </div>
      <div className="box flex justify-between items-center">
        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-black-600 text-lg">Details Budget</h3>
          <p className="text-black-800 text-base font-medium grid grid-cols-12">
            <span className="col-span-4 font-bold">Limit</span>
            <span className="col-span-8 font-semibold">
              : {formatCurrency(data.limit)}
            </span>
          </p>
          <p className="text-black-800 text-base font-medium grid grid-cols-12">
            <span className="col-span-4 font-bold">Spent</span>
            <span className="col-span-8 font-semibold">: {formatCurrency(spent)}</span>
          </p>
          <p className="text-black-800 text-base font-medium grid grid-cols-12">
            <span className="col-span-4 font-bold">Remaining</span>
            <span className="col-span-8 font-semibold">
              : {formatCurrency(remaining)}
            </span>
          </p>
          <p className="text-black-800 text-base font-medium grid grid-cols-12">
            <span className="col-span-4 font-bold">Avg per Txn</span>
            <span className="col-span-8 font-semibold">
              : {formatCurrency(average)}/txn
            </span>
          </p>
          <p className="text-black-800 text-base font-medium grid grid-cols-12">
            <span className="col-span-4 font-bold">Transactions</span>
            <span className="col-span-8 font-semibold">: {quantity} Transaksi</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-black-600 text-lg">Expense Breakdown: </h3>
        <ul className="flex flex-col gap-3">
          {expenses.map((item) => (
            <BudgetItem
              key={item.id}
              item={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const BudgetItem = ({ item }) => {
  return (
    <li className="w-full grid grid-cols-12 gap-3 text-sm">
      <div className="col-span-7 box truncate">
        <span className="text-base font-semibold">{item.description}</span>
      </div>
      <div className="col-span-5 box truncate flex flex-col">
        <span className="text-base font-semibold">
          {formatCurrency(item.amount, { notation: "compact", compactDisplay: "short" })}
        </span>
        <span className="text-xs font-semibold text-black-600">
          {formatDate(item.date)}
        </span>
      </div>
    </li>
  );
};

export default BudgetDetailPanel;
