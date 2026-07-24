import { cn } from "../../../utils";

import { TbReceiptOff, TbPlus } from "react-icons/tb";

import ExpenseItem from "./ExpenseItem";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";

const ExpenseList = ({ data, onEdit, onDelete, onOpen }) => {
  if (!data || data.length === 0)
    return (
      <EmptyState
        title="There is no expenses"
        description="Try to change filter or add new expense for this month"
        Icon={TbReceiptOff}
        icon_cls="text-expense-200">
        <Button
          label="Add Expense"
          onClick={onOpen}
          cls="text-black-50 bg-expense-500">
          <TbPlus className="size-5 stroke-3" />
        </Button>
      </EmptyState>
    );

  return (
    <div className={cn("flex flex-col gap-3", "w-full h-full")}>
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-bold">Transaction History</h2>
        <p className="font-normal text-sm text-black-500">{data.length} transaction</p>
      </div>
      <ul
        className={cn(
          "flex flex-col gap-0",
          "w-full max-h-100 overflow-y-auto scrollbar-none",
          "divide-y rounded-lg border-2",
          "divide-black-500 bg-black-50 shadow-neo-lg shadow-black-900 border-black-900",
        )}>
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
