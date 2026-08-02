import { cn } from "../../../utils";

import { IconReload } from "@tabler/icons-react";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

const BudgetFilters = ({ filters, dispatch }) => {
  return (
    <div
      role="group"
      aria-label="Budget filters"
      className={cn("grid grid-cols-[minmax(50px,1fr)_auto] gap-3", "w-full")}>
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
      <Button
        aria-label="Reset filter"
        onClick={() => dispatch({ type: "RESET" })}>
        <IconReload className="stroke-2 size-4.5" />
      </Button>
    </div>
  );
};

export default BudgetFilters;
