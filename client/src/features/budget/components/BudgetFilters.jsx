import Input from "../../../components/Input";
import Button from "../../../components/Button";

const BudgetFilters = ({ filters, dispatch }) => {
  return (
    <div
      aria-label="Income filters"
      className="flex justify-center items-start gap-5">
      <Input
        type="month"
        id="filterMonth"
        value={filters.month}
        onChange={(e) => dispatch({ type: "SET_MONTH", payload: e.target.value })}
      />
      <Button
        label="Reset"
        onClick={(e) => dispatch({ type: "RESET" })}
      />
    </div>
  );
};

export default BudgetFilters;
