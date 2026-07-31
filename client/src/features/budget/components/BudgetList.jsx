import { cn } from "../../../utils";

import { TbCashOff, TbPlus } from "react-icons/tb";

import BudgetItem from "./BudgetItem";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";

const BudgetList = ({ data, data_expenses, onEdit, onDelete, onDetail, onOpen }) => {
  if (!data || data.length === 0)
    return (
      <EmptyState
        title="There is no budgets"
        description="Try to change filter or add new budget for this month"
        Icon={TbCashOff}
        icon_cls="text-budget-200">
        <Button
          label="Add budget"
          onClick={onOpen}
          cls="text-black-50 bg-budget-500">
          <TbPlus className="size-5 stroke-3" />
        </Button>
      </EmptyState>
    );

  return (
    <div className={cn("flex flex-col gap-3", "w-full h-full")}>
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-bold">Budget History</h2>
        <p className="font-normal text-sm text-black-500">{data.length} category</p>
      </div>
      <ul className="flex flex-col gap-5">
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
    </div>
  );
};

export default BudgetList;
