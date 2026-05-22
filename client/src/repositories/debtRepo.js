import { debts } from "../lib/msw/db";
import { getFullDate } from "../utils/date";
import { generateId } from "../utils/generateId";

import { PAYMENT_STATUS } from "../constants";

const getDebts = () => debts;

const addDebt = ({ totalAmount, description, type, dueDate }) => {
  const data = {
    id: generateId("dbt"),
    totalAmount: Number(totalAmount),
    remainingAmount: Number(totalAmount),
    description,
    type,
    dueDate: dueDate ?? null,
    status: PAYMENT_STATUS.ACTIVE,
    createdAt: getFullDate(),
    payments: [],
  };

  debts.push(data);
  return { ok: true, data };
};

const updateDebt = (id, { totalAmount, description, type, dueDate }) => {
  const data = {
    totalAmount: Number(totalAmount),
    description,
    type,
    dueDate,
  };

  const index = debts.findIndex((dbt) => dbt.id === id);
  const totalPaid = debts[index].payments.reduce((acc, curr) => acc + curr.amount, 0);
  debts[index].remainingAmount = Number(totalAmount) - totalPaid;
  debts[index] = { ...debts[index], ...data };
  return { ok: true, data };
};

const deleteDebt = (id) => {
  const newDebts = debts.filter((dbt) => dbt.id !== id);
  const data = debts.splice(0, debts.length, ...newDebts);

  return { ok: true, data };
};

const addPayment = (id, { amount, date, note }) => {
  const data = {
    amount: Number(amount),
    date,
    note: note ?? null,
  };
  const index = debts.findIndex((dbt) => dbt.id === id);
  debts[index].payments.push(data);

  const totalPayment = debts[index].payments.reduce((acc, curr) => acc + curr.amount, 0);
  const debt = {
    id: generateId("pay"),
    status:
      debts[index].totalAmount - totalPayment === 0
        ? PAYMENT_STATUS.PAID_OFF
        : PAYMENT_STATUS.ACTIVE,
    remainingAmount: debts[index].totalAmount - totalPayment,
  };
  debts[index] = { ...debts[index], ...debt };

  return { ok: true, data: debts[index] };
};

const findByIdDebt = (id) => {
  return debts.find((dbt) => dbt.id === id);
};

export { getDebts, addDebt, updateDebt, deleteDebt, addPayment, findByIdDebt };
