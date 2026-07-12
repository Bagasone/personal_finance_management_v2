import { PAYMENT_STATUS } from "../../../constants";

import Button from "../../../components/Button";

const DebtFilter = ({ filters, onFilters }) => {
  return (
    <div
      aria-label="Income filters"
      className="flex justify-center items-start gap-5">
      <select
        value={filters}
        id="filter"
        name="filter"
        onChange={(e) => onFilters(e.target.value)}
        className="box">
        <option value={PAYMENT_STATUS.ACTIVE}>{PAYMENT_STATUS.ACTIVE}</option>
        <option value={PAYMENT_STATUS.PAID_OFF}>{PAYMENT_STATUS.PAID_OFF}</option>
        <option value="over_due">Over Due</option>
      </select>
      <Button
        label="Reset"
        onClick={() => onFilters("active")}
      />
    </div>
  );
};

export default DebtFilter;
