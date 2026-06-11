import EmptyState from "../../../components/EmptyState";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ data, onEdit, onDelete }) => {
  if (!data) return <EmptyState message="There is No Expenses" />;

  return (
    <ul className="flex flex-col justify-center items-start gap-3">
      {data.map((item) => (
        <ExpenseItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
