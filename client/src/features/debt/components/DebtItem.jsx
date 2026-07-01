import { TYPE_ICONS } from "../../../constants/icons";

import { formatCurrency, formatDate } from "../../../utils/formatter";

import Button from "../../../components/Button";

const DebtItem = ({ item, onEdit, onDelete, onDetail }) => {
  const Icon = TYPE_ICONS[item.type];
  const dueDate = new Date(item.dueDate);

  const className =
    item.remainingAmount === 0
      ? { type: "bg-income-500/5 text-income-700", amount: "text-income-700" }
      : item.type === "owe"
        ? { type: "bg-debt-500/5 text-debt-700", amount: "text-debt-700" }
        : { type: "bg-budget-500/5 text-budget-700", amount: "text-budget-700" };

  return (
    <li
      onClick={() => onDetail(item)}
      className="grid grid-cols-12 w-full items-center gap-3 border rounded-sm px-3 py-1 text-sm">
      <div className="col-span-1 flex justify-center items-center">
        <Icon className="size-8 stroke-1" />
      </div>
      <div className="col-span-8 flex flex-col gap-3 border rounded-sm px-2 py-1">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <div
              title={item.description}
              className="truncate text-lg font-medium">
              {item.description}
            </div>
            <div className={`border rounded-sm px-2 py-1 truncate ${className.type}`}>
              {item.remainingAmount === 0 ? "Paid Off" : item.type}
            </div>
          </div>
          <div
            className={`border rounded-sm px-2 py-1 truncate text-lg font-medium ${className.amount}`}>
            {formatCurrency(item.remainingAmount)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="border rounded-sm px-2 py-1 truncate">
            {item.dueDate
              ? `Due: ${formatDate(dueDate, { year: "numeric", month: "short", day: "numeric" })}`
              : "No Due date"}
          </div>
          <div className="border rounded-sm px-2 py-1 truncate">
            {formatCurrency(item.totalAmount)}
          </div>
        </div>
      </div>
      <div className="col-span-3 flex justify-center items-center gap-3 border rounded-sm px-2 py-1 truncate">
        <Button
          label="Edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
          className="border rounded-sm px-2 py-1"
        />
        <Button
          label="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="border rounded-sm px-2 py-1"
        />
      </div>
    </li>
  );
};

export default DebtItem;
