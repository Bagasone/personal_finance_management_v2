import BudgetItem from "./BudgetItem";
import EmptyState from "../../../components/EmptyState";

const BudgetList = ({ data, data_expenses, onEdit, onDelete, onDetail, onOpen }) => {
  if (!data || data.length === 0)
    return (
      <EmptyState
        message="There is No Budget For this Month"
        action_label="Add New Budget"
        onAction={onOpen}
      />
    );

  return (
    <ul className="w-full flex flex-col gap-3 overflow-scroll max-h-full scrollbar-none">
      {data.map((bud) => (
        <BudgetItem
          key={bud.id}
          data={bud}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
          data_expenses={data_expenses}
        />
      ))}
    </ul>
  );
};

export default BudgetList;
