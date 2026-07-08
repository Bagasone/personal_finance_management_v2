import { useReducer } from "react";
import useForm from "../../../hooks/useForm";

import { percent } from "../../../utils/calculate";
import { getDate } from "../../../utils/date";
import { formatCurrency, formatDate } from "../../../utils/formatter";
import { validatePayment } from "../utils/validation";
import { errorField } from "../../../utils/errors";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";
import { variations } from "../utils/variation";

const DebtDetailPanel = ({ data, onAddPayment, serverErrors }) => {
  const [form, dispatch] = useForm({
    amount: "",
    date: getDate(),
    note: "",
  });

  if (!data) return <EmptyState message="Pick one Debt to see the detail" />;

  const paidDebt = data.payments.reduce((acc, curr) => acc + curr.amount, 0);
  const percentDebt = percent(paidDebt, data.totalAmount);

  const variation = variations(data);
  const error = errorField(form.errors, serverErrors.fields);

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
        <span className={`box ${variation.classType}`}>{data.type}</span>
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
          <p className={`${variation.classAmount} text-lg font-medium`}>
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
        {serverErrors && (
          <p className="text-lg text-expense-500">{serverErrors.message}</p>
        )}
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
        {data.remainingAmount === 0 ? (
          <p>This debt has been fully paid</p>
        ) : (
          <div className="flex flex-col gap-3">
            <Input
              type="number"
              label="Amount"
              id="amount"
              value={form.amount}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "amount", payload: e.target.value })
              }
              error={error("amount")}
            />
            <Input
              type="date"
              label="Date"
              id="date"
              value={form.date}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "date", payload: e.target.value })
              }
              error={error("date")}
            />
            <Input
              type="text"
              label="Note"
              id="note"
              value={form.note}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "note", payload: e.target.value })
              }
              error={error("note")}
            />
            <Button
              label="Add Payment"
              onClick={handleAddPayment}
            />
          </div>
        )}
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
