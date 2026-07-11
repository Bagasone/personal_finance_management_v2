import { INCOME_SOURCES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";

const IncomeFilters = ({ filters, dispatch }) => {
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
      <Select
        id="filterSourceId"
        value={filters.source_id}
        options={INCOME_SOURCES}
        onChange={(e) => dispatch({ type: "SET_SOURCE", payload: e.target.value })}>
        <Option
          label="All Source"
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

export default IncomeFilters;
