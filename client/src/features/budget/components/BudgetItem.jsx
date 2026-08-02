import { cn, calculate, calculatePercent, formatCurrency } from "../../../utils";
import { statusIndicator } from "../utils/";
import { iconCategory, labelCategory } from "../../../shared/category";

import { TbEdit, TbTrash } from "react-icons/tb";
import { STATUS_COLORS_LIGHT } from "../constants/color";

import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";

const BudgetItem = ({ data, onEdit, onDelete, onDetail, data_expenses }) => {
  const Icon = iconCategory(data.category_id);

  const label = labelCategory(data.category_id);
  const total = calculate(data_expenses, "amount", {
    key: "category_id",
    value: data.category_id,
  });
  const percent = calculatePercent(total, data.limit);

  const { status_label, status_key } = statusIndicator(percent);

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(data);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(data.id);
  };

  const handleDetail = () => {
    onDetail(data);
  };

  return (
    <li
      role="button"
      aria-label={`Lihat detail budget ${label}`}
      tabIndex={0}
      onClick={handleDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleDetail();
      }}
      className={cn(
        "flex flex-col gap-1",
        "rounded-lg border-2 px-5 py-3",
        "shadow-neo-lg shadow-black-900 border-black-900",
      )}>
      <div className="flex justify-between items-center gap-3">
        <p className="flex justify-center items-center gap-3">
          <Icon className={cn("size-7 rounded-lg p-1", "bg-black-200 text-black-900")} />
          <span
            title={data.description}
            className="text-base font-medium truncate">
            {label}
          </span>
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            "rounded-lg px-3 py-0.5",
            STATUS_COLORS_LIGHT[status_key].badge,
          )}>
          {status_label}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <ProgressBar
          fill={percent}
          cls={cn("h-3", STATUS_COLORS_LIGHT[status_key].bar)}
        />
        <div className="flex justify-between items-center gap-3">
          <p className="text-xs text-black-800 font-semibold">
            <span className={cn(STATUS_COLORS_LIGHT[status_key].text)}>
              {formatCurrency(total)}
            </span>
            /{formatCurrency(data.limit)}
          </p>
          <p className="text-xs text-black-800 font-semibold">{percent}%</p>
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
