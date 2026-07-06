import { useReducer } from "react";

import { percent } from "../../../utils/calculate";
import { getDate } from "../../../utils/date";
import { formatCurrency, formatDate } from "../../../utils/formatter";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";
import { validatePayment } from "../utils/validation";

const initialState = {
  amount: "",
  date: getDate(),
  note: "",
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    case "INVALID":
      return { ...state, errors: action.payload };
    case "RESET":
      return initialState;
  }
};

const DebtDetailPanel = ({ data, onAddPayment, serverError }) => {
  const [form, dispatch] = useReducer(reducer, initialState);

  if (!data) return <EmptyState message="Pick one Debt to see the detail" />;

  const paidDebt = data.payments.reduce((acc, curr) => acc + curr.amount, 0);
  const percentDebt = percent(paidDebt, data.totalAmount);

  const className =
    data.remainingAmount === 0
      ? { type: "bg-income-500/5 text-income-500", amount: "text-income-500" }
      : data.type === "owe"
        ? { type: "bg-debt-500/5 text-debt-500", amount: "text-debt-500" }
        : { type: "bg-budget-500/5 text-budget-500", amount: "text-budget-500" };

  const handleAddPayment = (e) => {
    e.preventDefault();
    const { valid, errors } = validatePayment(form, data.remainingAmount);
    if (valid) {
      const { errors, ...formData } = form;
      onAddPayment(formData);
      dispatch({ type: "RESET" });
    } else dispatch({ type: "INVALID", payload: errors });
  };

  return (
    <div className="box flex flex-col gap-3 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{data.description}</h2>
        <span className={`box ${className.type}`}>{data.type}</span>
      </div>
      <div className="box flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-black-600 text-sm">Total</span>
          <p className="text-black-800 text-lg font-medium">
            {formatCurrency(data.totalAmount)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-black-600 text-sm">Remaining</span>
          <p className={`${className.amount} text-lg font-medium`}>
            {formatCurrency(data.remainingAmount)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-black-600">Paid Off:</span>
          <span className="text-black-600">{percentDebt}</span>
        </div>
        <div className="flex justify-start items-center rounded-sm bg-black-300 w-full h-3">
          <div
            style={{ width: percentDebt }}
            className="rounded-sm h-3 bg-debt-500"></div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-black-600 font-semibold">Payment History</h3>
        {serverError && <p className="text-lg text-expense-500">{serverError}</p>}
        <div className="flex flex-col gap-3">
          {data.payments.map((item) => (
            <DetailItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-black-600 font-semibold">Added Payment</h3>
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            label="Amount"
            id="amount"
            value={form.amount}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "amount", payload: e.target.value })
            }
            error={form.errors.amount}
          />
          <Input
            type="date"
            label="Date"
            id="date"
            value={form.date}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "date", payload: e.target.value })
            }
            error={form.errors.date}
          />
          <Input
            type="text"
            label="Note"
            id="note"
            value={form.note}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "note", payload: e.target.value })
            }
            error={form.errors.note}
          />
          <Button
            label="Add Payment"
            onClick={handleAddPayment}
          />
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ item }) => {
  const paidDate = new Date(item.date);
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
      {item.note && <span className="text-black-500 text-sm">{item.note}</span>}
      <span className="text-black-600 text-sm">
        {formatDate(paidDate, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
};
export default DebtDetailPanel;
