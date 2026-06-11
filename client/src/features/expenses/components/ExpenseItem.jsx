import { EXPENSE_CATEGORIES } from "../../../constants";

const ExpenseItem = ({ item, onEdit, onDelete }) => {
  const categoryName =
    EXPENSE_CATEGORIES.find((cat) => cat.id === item.categoryId)?.name ?? "Unknown";

  return (
    <li className="flex items-center gap-3 border rounded-sm px-3 py-1">
      <span className="border rounded-sm px-2 py-1">{item.description}</span>
      <span className="border rounded-sm px-2 py-1">{item.amount}</span>
      <span className="border rounded-sm px-2 py-1">{categoryName}</span>
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
