import DebtItem from "./DebtItem";
import EmptyState from "../../../components/EmptyState";

const DebtList = ({ data, onEdit, onDelete, onDetail }) => {
  if (!data) return <EmptyState message="There is No Debt" />;

  return (
    <ul className="flex flex-col gap-3 overflow-scroll scrollbar-none w-full">
      {data.map((item) => (
        <DebtItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
        />
      ))}
    </ul>
  );
};

export default DebtList;
