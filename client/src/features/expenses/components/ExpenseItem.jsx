import { EXPENSE_CATEGORIES } from "../../../constants";
import { CATEGORY_ICONS } from "../../../constants/icons";
import {} from "react-icons";

import Button from "../../../components/Button";

const ExpenseItem = ({ item, onEdit, onDelete }) => {
  const categoryLabel =
    EXPENSE_CATEGORIES.find((c) => c.id === item.categoryId).label ?? "Other";
  const Icon = CATEGORY_ICONS[item.categoryId] ?? CATEGORY_ICONS["other"];

  return (
    <li className="grid grid-cols-12 w-full items-center gap-3 border rounded-sm px-3 py-1 text-sm">
      <div className="col-span-3 flex items-center gap-3 border rounded-sm px-2 py-1">
        <Icon />
        <span
          title={item.description}
          className="truncate">
          {item.description}
        </span>
      </div>
      <div className="col-span-2 border rounded-sm px-2 py-1 truncate">{item.amount}</div>
      <div className="col-span-2 border rounded-sm px-2 py-1 truncate">
        {categoryLabel}
      </div>
      <div className="col-span-2 border rounded-sm px-2 py-1 truncate">{item.date}</div>
      <div className="col-span-3 flex justify-center items-center gap-3 border rounded-sm px-2 py-1 truncate">
        <Button
          label="Edit"
          onClick={() => onEdit(item)}
          className="border rounded-sm px-2 py-1"
        />
        <Button
          label="Delete"
          onClick={() => onDelete(item.id)}
          className="border rounded-sm px-2 py-1"
        />
      </div>
    </li>
  );
};

export default ExpenseItem;
