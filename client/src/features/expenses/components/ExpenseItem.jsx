import { EXPENSE_CATEGORIES } from "../../../constants";
import { CATEGORY_ICONS } from "../../../constants/icons";

const ExpenseItem = ({ item, onEdit, onDelete }) => {
  const categoryLabel =
    EXPENSE_CATEGORIES.find((c) => c.id === item.categoryId).label ?? "Unknown";
  const Icon = CATEGORY_ICONS[item.categoryId] ?? CATEGORY_ICONS[other];

  return (
    <li className="flex items-center gap-3 border rounded-sm px-3 py-1">
      <span className="border rounded-sm px-2 py-1">
        <Icon />
      </span>
      <span className="border rounded-sm px-2 py-1">{item.description}</span>
      <span className="border rounded-sm px-2 py-1">{item.amount}</span>
      <span className="border rounded-sm px-2 py-1">{categoryLabel}</span>
      <span className="border rounded-sm px-2 py-1">{item.date}</span>
      <button
        onClick={() => onEdit(item)}
        className="border rounded-sm px-2 py-1">
        Edit
      </button>
      <button
        onClick={() => onDelete(item.id)}
        className="border rounded-sm px-2 py-1">
        Delete
      </button>
    </li>
  );
};

export default ExpenseItem;
