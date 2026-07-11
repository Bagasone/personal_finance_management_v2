import { useReducer } from "react";

import useForm from "../../../hooks/useForm";

import { calculatePercent, calculate } from "../../../utils/calculate";
import { getDate } from "../../../utils/date";
import { formatCurrency, formatDate } from "../../../utils/formatter";
import { validatePayment } from "../utils/validation";
import { errorField } from "../../../utils/error";
import { typeIndicator } from "../utils/indicator";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";

const DebtDetailPanel = ({ data, onAddPayment, server_errors }) => {
  const [form, dispatch] = useForm({
    amount: "",
    date: getDate(),
    note: "",
  });

  if (!data) return <EmptyState message="Pick one Debt to see the detail" />;

  const paid = calculate(data.payments, "amount");
  const percent = calculatePercent(paid, data.total_amount);

  const { type_label, type_cls, remaining_cls } = typeIndicator(
    data.remaining_amount,
    data.type,
  );

  const error = errorField(form.errors, server_errors.fields);

  const handleAddPayment = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_ERROR" });

    const { valid, errors } = validatePayment(form, data.remaining_amount);
    if (valid) {
      const { errors, ...formData } = form;
      onAddPayment(formData, () => dispatch({ type: "RESET" }));
    } else dispatch({ type: "INVALID", payload: errors });
  };

  return (
    <div className="box flex flex-col gap-3 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{data.description}</h2>
        <span className={`box ${type_cls}`}>{data.type}</span>
      </div>
      <div className="box flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-black-600 text-sm">Total</span>
          <p className="text-black-800 text-lg font-medium">
            {formatCurrency(data.total_amount)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-black-600 text-sm">Remaining</span>
          <p className={`${remaining_cls} text-lg font-medium`}>
            {formatCurrency(data.remaining_amount)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-black-600">Paid Off:</span>
          <span className="text-black-600">{percent}</span>
        </div>
        <div className="flex justify-start items-center rounded-sm bg-black-300 w-full h-3">
          <div
            style={{ width: percent }}
            className="rounded-sm h-3 bg-debt-500"></div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-black-600 font-semibold">Payment History</h3>
        {server_errors && (
          <p className="text-lg text-expense-500">{server_errors.message}</p>
        )}
        <div className="flex flex-col gap-3">
          {data.payments.map((pay) => (
            <DetailItem
              key={pay.id}
              data={pay}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-black-600 font-semibold">Added Payment</h3>
        {data.remaining_amount === 0 ? (
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

const DetailItem = ({ data }) => {
  const paid_date = new Date(data.date);

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-semibold">{formatCurrency(data.amount)}</span>
      {data.note && <span className="text-black-500 text-sm">{data.note}</span>}
      <span className="text-black-600 text-sm">
        {formatDate(paid_date, { month: "short" })}
      </span>
    </div>
  );
};
export default DebtDetailPanel;
