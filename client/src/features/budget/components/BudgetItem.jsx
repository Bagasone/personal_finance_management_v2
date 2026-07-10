import { calculate, calculatePercent } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";
import { iconCategory } from "../../../utils/icon";
import { labelCategory } from "../../../utils/label";
import { statusIndicator } from "../utils/indicator";

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

  const { status_label, status_cls, bar_cls } = statusIndicator(percent);

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
      className="box flex flex-col gap-3"
      onClick={handleDetail}>
      <div
        aria-label="card-head"
        className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="box flex justify-center items-center gap-3">
            <span className="stroke-2">
              <Icon className="size-6" />
            </span>
            <span
              title={data.description}
              className="truncate">
              {label}
            </span>
          </p>
          <p className={`box font-bold ${status_cls}`}>{status_label}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            label="Edit"
            onClick={handleEdit}
          />
          <Button
            label="Delete"
            onClick={handleDelete}
          />
        </div>
      </div>
      <div
        aria-label="card-body"
        className="flex flex-col gap-3">
        <ProgressBar
          fill={percent}
          color={bar_cls}
        />
        <div className="box flex justify-between items-center gap-3">
          <p>Spent: {formatCurrency(total)}</p>
          <p>{percent}</p>
          <p>Limit: {formatCurrency(data.limit)}</p>
        </div>
      </div>
    </li>
  );
};

export default BudgetItem;
