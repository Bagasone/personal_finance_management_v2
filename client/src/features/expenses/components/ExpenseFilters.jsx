import { EXPENSE_CATEGORIES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";

const ExpenseFilters = ({ filters, dispatch }) => {
  return (
    <div
      aria-label="Expense filters"
      className="flex justify-center items-start gap-5">
      <Input
        type="month"
        id="filterCategory"
        value={filters.month}
        onChange={(e) => dispatch({ type: "SET_MONTH", payload: e.target.value })}
      />
      <Select
        id="filterCategoryId"
        value={filters.categoryId}
        options={EXPENSE_CATEGORIES}
        onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })}>
        <Option
          label="All Category"
          value=""
        />
      </Select>
      <Button
        label="Reset"
        onClick={() => dispatch({ type: "RESET" })}
      />
    </div>
  );
};

export default ExpenseFilters;
