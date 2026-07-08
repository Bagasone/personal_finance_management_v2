import BudgetItem from "./BudgetItem";
import EmptyState from "../../../components/EmptyState";

const BudgetList = ({ dataBudgets, dataExpenses, onEdit, onDelete, onDetail }) => {
  if (!dataBudgets) return <EmptyState message="There is No Budget For this Month" />;

  return (
    <ul className="w-full flex flex-col gap-3 overflow-scroll max-h-full scrollbar-none">
      {dataBudgets.map((item) => (
        <BudgetItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
          data={dataExpenses}
        />
      ))}
    </ul>
  );
};

export default BudgetList;
