import { cn } from "../../../utils";

import { EXPENSE_CATEGORIES } from "../../../constants";
import { TbReload } from "react-icons/tb";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";

const ExpenseFilters = ({ filters, dispatch }) => {
  return (
    <div
      role="group"
      aria-label="Expense filters"
      className={cn("grid grid-cols-[repeat(2,minmax(50px,1fr))_auto] gap-3", "w-full")}>
      <div
        className={cn(
          "rounded-md border-2 p-1",
          "shadow-neo-md shadow-black-900 border-black-900",
        )}>
        <Input
          type="month"
          id="filterMonth"
          value={filters.month}
          onChange={(e) => dispatch({ type: "SET_MONTH", payload: e.target.value })}
          cls={cn("font-medium text-sm", "px-2")}
        />
      </div>
      <div
        className={cn(
          "rounded-md border-2 p-1",
          "shadow-neo-md shadow-black-900 border-black-900",
        )}>
        <Select
          id="filterCategoryId"
          value={filters.category_id}
          options={EXPENSE_CATEGORIES}
          onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })}
          cls={cn("font-medium text-sm", "px-2")}>
          <Option
            label="All Category"
            value=""
          />
        </Select>
      </div>
      <Button
        aria-label="Reset filter"
        onClick={() => dispatch({ type: "RESET" })}>
        <TbReload className="stroke-2 size-4.5" />
      </Button>
    </div>
  );
};

export default ExpenseFilters;
