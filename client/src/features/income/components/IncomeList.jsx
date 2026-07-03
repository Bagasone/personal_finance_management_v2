import IncomeItem from "./IncomeItem";
import EmptyState from "../../../components/EmptyState";

const IncomeList = ({ data, onEdit, onDelete, onOpen }) => {
  if (!data)
    return (
      <EmptyState
        message="There is No Income For this Month"
        actionLabel="Add Income"
        onAction={onOpen}
      />
    );

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">Income List</h2>
      <div
        aria-label="list header"
        className="grid grid-cols-12 w-full">
        <div className="col-span-3">Description</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-2">Source</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-3">Actions</div>
      </div>
      <ul className="flex flex-col gap-3 overflow-scroll max-h-full scrollbar-none">
        {data.map((item) => (
          <IncomeItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
