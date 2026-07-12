import DebtItem from "./DebtItem";
import EmptyState from "../../../components/EmptyState";

const DebtList = ({ data, title, onEdit, onDelete, onDetail, onOpen }) => {
  if (!data || data.length === 0)
    return (
      <EmptyState
        message="There is No Debt Currently"
        action_label="Add New Debt"
        onAction={onOpen}
      />
    );

  return (
    <div>
      <h2 className="text-xl font-bold">{title} List</h2>
      <ul className="flex flex-col gap-3 overflow-scroll scrollbar-none w-full">
        {data.map((dbt) => (
          <DebtItem
            key={dbt.id}
            data={dbt}
            onEdit={onEdit}
            onDelete={onDelete}
            onDetail={onDetail}
          />
        ))}
      </ul>
    </div>
  );
};

export default DebtList;
