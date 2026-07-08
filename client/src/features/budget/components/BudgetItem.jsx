import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";

import { calculate, percent } from "../../../utils/calculate";
import { formatCurrency } from "../../../utils/formatter";
import { iconCategory } from "../../../utils/icon";
import { labelCategory } from "../../../utils/label";
import { variations } from "../utils/variation";

const BudgetItem = ({ item, onEdit, onDelete, onDetail, data }) => {
  const Icon = iconCategory(item.categoryId);
  const Label = labelCategory(item.categoryId);

  const TotalCategory = calculate(data, "amount", {
    key: "categoryId",
    id: item.categoryId,
  });

  const PercentCategory = percent(TotalCategory, item.limit);
  const BudgetVariation = variations(PercentCategory);

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(item);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  return (
    <li
      className="box flex flex-col gap-3"
      onClick={() => onDetail(item)}>
      <div
        aria-label="card-head"
        className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="box flex justify-center items-center gap-1">
            <Icon /> {Label}
          </p>
          <p className={`box ${BudgetVariation.classLabel} font-bold`}>
            {BudgetVariation.label}
          </p>
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
          fill={PercentCategory}
          color={BudgetVariation.classBar}
        />
        <div className="box flex justify-between items-center gap-3">
          <p>Spent: {formatCurrency(TotalCategory)}</p>
          <p>{PercentCategory}</p>
          <p>Limit: {formatCurrency(item.limit)}</p>
        </div>
      </div>
    </li>
  );
};

export default BudgetItem;
