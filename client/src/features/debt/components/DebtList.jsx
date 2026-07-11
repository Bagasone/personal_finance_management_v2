import DebtItem from "./DebtItem";
import EmptyState from "../../../components/EmptyState";

const DebtList = ({ data, onEdit, onDelete, onDetail, onOpen }) => {
  if (!data || data.length === 0)
    return (
      <EmptyState
        message="There is No Debt Currently"
        action_label="Add New Debt"
        onAction={onOpen}
      />
    );

  return (
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
  );
};

export default DebtList;
