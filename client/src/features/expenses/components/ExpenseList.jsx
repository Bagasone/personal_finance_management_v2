import ExpenseItem from "./ExpenseItem";
import EmptyState from "../../../components/EmptyState";

const ExpenseList = ({ data, onEdit, onDelete, onFocus }) => {
  if (!data || data.length === 0)
    return (
      <EmptyState
        message="There is No Expense For this Month"
        action_label="Add New Expense"
        onAction={onFocus}
      />
    );

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">Expense List</h2>
      <div
        aria-label="list header"
        className="grid grid-cols-12 w-full">
        <div className="col-span-3">Description</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-3">Actions</div>
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {data.map((exp) => (
          <ExpenseItem
            key={exp.id}
            data={exp}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
