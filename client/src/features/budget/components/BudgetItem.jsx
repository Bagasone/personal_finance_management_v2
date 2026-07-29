import {
  cn,
  calculate,
  calculatePercent,
  formatCurrency,
  iconCategory,
  labelCategory,
} from "../../../utils";
import { statusIndicator } from "../utils/";

import { TbEdit, TbTrash } from "react-icons/tb";

import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";

const BudgetItem = ({ data, onEdit, onDelete, data_expenses }) => {
  const Icon = iconCategory(data.category_id);

  const label = labelCategory(data.category_id);
  const total = calculate(data_expenses, "amount", {
    key: "category_id",
    value: data.category_id,
  });
  const percent = calculatePercent(total, data.limit);

  const { status_label, status_cls, bar_cls } = statusIndicator(percent);

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(data);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(data.id);
  };

  return (
    <li
      role="button"
      aria-label={`Lihat detail budget ${label}`}
      tabIndex={0}
      className={cn(
        "flex flex-col gap-3",
        "rounded-lg border-2 px-5 py-3",
        "bg-black-50 shadow-neo-lg shadow-black-900 border-black-900",
      )}>
      <div className="flex justify-between items-center gap-3">
        <p className="flex justify-center items-center gap-3">
          <Icon className={cn("size-7 rounded-lg p-1", "bg-black-200 text-black-800")} />
          <span
            title={data.description}
            className="text-base font-medium truncate">
            {label}
          </span>
        </p>
        <p className={cn("text-xs font-medium", "rounded-lg px-3 py-0.5", status_cls)}>
          {status_label}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <ProgressBar
          fill={percent}
          color={bar_cls}
        />
        <div className="flex justify-between items-center gap-3">
          <p className="text-sm text-black-700">
            {formatCurrency(total)}/{formatCurrency(data.limit)}
          </p>
          <p className="text-base text-black-800">{percent}%</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <Button
          aria-label="Edit button"
          onClick={handleEdit}
          cls={cn("p-1 border-none shadow-none")}>
          <TbEdit className="size-4.5 stroke-1" />
        </Button>
        <Button
          aria-label="Delete button"
          onClick={handleDelete}
          cls={cn("p-1 border-none shadow-none")}>
          <TbTrash className="size-4.5 stroke-1" />
        </Button>
      </div>
    </li>
  );
};

export default BudgetItem;
