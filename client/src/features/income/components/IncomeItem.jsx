import { cn, iconSource, labelSource, formatCurrency, formatDate } from "../../../utils";

import { TbEdit, TbTrash } from "react-icons/tb";

import Button from "../../../components/Button";

const IncomeItem = ({ data, onEdit, onDelete }) => {
  const Icon = iconSource(data.source_id);

  const label = labelSource(data.source_id);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(data.id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(data);
  };

  return (
    <li className="grid grid-cols-[40px_1.5fr_1fr] items-center gap-5 px-5 py-3">
      <div className="flex flex-col justify-center items-center gap-1">
        <Icon className={cn("size-10 rounded-lg p-1.5", "bg-black-200")} />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="font-medium text-lg truncate">{data.description}</span>
        <span
          className={cn(
            "flex flex-nowrap",
            "text-sm font-light text-black-500 truncate",
          )}>
          {formatDate(data.date, { year: null, month: "short" })} • {label}
        </span>
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="font-medium text-lg text-income-500 truncate">
          +{formatCurrency(data.amount, { notation: "compact", compactDisplay: "short" })}
        </span>
        <span className="flex">
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
        </span>
      </div>
    </li>
  );
};

export default IncomeItem;
