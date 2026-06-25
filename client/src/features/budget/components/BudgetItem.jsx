import { EXPENSE_CATEGORIES } from "../../../constants";
import { CATEGORY_ICONS } from "../../../constants/icons";

import { calculate, percent } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";

import Button from "../../../components/Button";

const BudgetItem = ({ item, onEdit, onDelete, data }) => {
  const Icon = CATEGORY_ICONS[item.categoryId] ?? CATEGORY_ICONS["other"];
  const categoryLabel =
    EXPENSE_CATEGORIES.find((e) => e.id === item.categoryId)?.label ?? "Other";

  const totalCategory = calculate(data, { label: "categoryId", value: item.categoryId });
  const percentCategory = percent(totalCategory, item.limit);

  const limitVariation =
    parseInt(percentCategory) <= 80
      ? {
          label: "On Track",
          classLabel: "bg-emerald-500/5 text-emerald-700",
          classBar: "bg-emerald-500",
        }
      : parseInt(percentCategory) <= 100
        ? {
            label: "Warning",
            classLabel: "bg-amber-500/5 text-amber-700",
            classBar: "bg-amber-500",
          }
        : {
            label: "Over Budget",
            classLabel: "bg-rose-500/5 text-rose-700",
            classBar: "bg-rose-500",
          };

  return (
    <li className="box flex flex-col gap-3">
      <div
        aria-label="card-head"
        className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="box flex justify-center items-center gap-1">
            <Icon /> {categoryLabel}
          </p>
          <p className={`box ${limitVariation.classLabel} font-bold`}>
            {limitVariation.label}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            label="Edit"
            onClick={() => onEdit(item)}
          />
          <Button
            label="Delete"
            onClick={() => onDelete(item.id)}
          />
        </div>
      </div>
      <div
        aria-label="card-body"
        className="flex flex-col gap-3">
        <div className="w-full h-3 rounded-sm bg-black-300">
          <div
            style={{ width: percentCategory }}
            className={`h-3 rounded-sm bg-opa ${limitVariation.classBar}`}></div>
        </div>
        <div className="box flex justify-between items-center gap-3">
          <p>Spent: {formatCurrency(totalCategory)}</p>
          <p>{percentCategory}</p>
          <p>Limit: {formatCurrency(item.limit)}</p>
        </div>
      </div>
    </li>
  );
};

export default BudgetItem;
