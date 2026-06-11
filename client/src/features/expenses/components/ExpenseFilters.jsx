import MonthPicker from "../../../pages/MonthPicker";
import SelectCategory from "./SelectCategory";

const ExpenseFilters = ({ filters, dispatch }) => {
  return (
    <div className="flex justify-center items-start gap-5">
      <div className="border px-3 py-1 rounded-sm text-sm cursor-pointer">
        <MonthPicker
          value={filters.month}
          onChange={(e) => dispatch({ type: "SET_MONTH", payload: e.target.value })}
        />
      </div>
      <div className="border px-3 py-1 rounded-sm text-sm cursor-pointer">
        <SelectCategory
          value={filters.categoryId}
          onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })}
        />
      </div>
      <button
        onClick={() => dispatch({ type: "RESET" })}
        className="border px-3 py-1 rounded-sm text-sm cursor-pointer">
        Reset
      </button>
    </div>
  );
};

export default ExpenseFilters;
