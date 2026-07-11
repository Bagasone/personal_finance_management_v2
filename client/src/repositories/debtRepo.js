import { debts } from "../lib/msw/db";
import { getFullDate } from "../utils/date";
import { generateId } from "../utils/generateId";

import { PAYMENT_STATUS } from "../constants";

const getDebts = () => debts;

const addDebt = ({ total_amount, description, type, due_date }) => {
  const data = {
    id: generateId("dbt"),
    total_amount: Number(total_amount),
    remaining_amount: Number(total_amount),
    description,
    type,
    due_date: due_date ?? null,
    status: PAYMENT_STATUS.ACTIVE,
    created_at: getFullDate(),
    payments: [],
  };

  debts.push(data);
  return { ok: true, data };
};

const updateDebt = (id, { total_amount, description, type, due_date }) => {
  const data = {
    total_amount: Number(total_amount),
    description,
    type,
    due_date,
  };

  const index = debts.findIndex((dbt) => dbt.id === id);
  const total_paid = debts[index].payments.reduce((acc, curr) => acc + curr.amount, 0);

  debts[index].remaining_amount = Number(total_amount) - total_paid;
  debts[index] = { ...debts[index], ...data };

  return { ok: true, data };
};

const deleteDebt = (id) => {
  const new_debts = debts.filter((dbt) => dbt.id !== id);
  const data = debts.splice(0, debts.length, ...new_debts);

  return { ok: true, data };
};

const addPayment = (id, { amount, date, note }) => {
  const data = {
    id: generateId("pay"),
    amount: Number(amount),
    date,
    note: note ?? null,
  };

  const index = debts.findIndex((dbt) => dbt.id === id);
  debts[index].payments.push(data);

  const remaining_amount =
    debts[index].total_amount -
    debts[index].payments.reduce((acc, curr) => acc + curr.amount, 0);

  const debt = {
    status: remaining_amount === 0 ? PAYMENT_STATUS.PAID_OFF : PAYMENT_STATUS.ACTIVE,
    remaining_amount,
  };
  debts[index] = { ...debts[index], ...debt };

  return { ok: true, data: debts[index] };
};

const findByIdDebt = (id) => {
  return debts.find((dbt) => dbt.id === id);
};

export { getDebts, addDebt, updateDebt, deleteDebt, addPayment, findByIdDebt };
