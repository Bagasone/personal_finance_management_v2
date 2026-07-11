import { expenses } from "../lib/msw/db";
import { getFullDate } from "../utils/date";
import { generateId } from "../utils/generateId";

const addExpense = ({ amount, description, category_id, date }) => {
  const data = {
    id: generateId("exp"),
    amount: Number(amount),
    description,
    category_id,
    date,
    created_at: getFullDate(),
  };

  expenses.push(data);
  return { ok: true, data };
};

const updateExpense = (id, { amount, description, category_id, date }) => {
  const data = {
    amount: Number(amount),
    description,
    category_id,
    date,
  };

  const index = expenses.findIndex((exp) => exp.id === id);
  expenses[index] = { ...expenses[index], ...data };

  return { ok: true, data };
};

const deleteExpense = (id) => {
  const new_expenses = expenses.filter((exp) => exp.id !== id);
  const data = expenses.splice(0, expenses.length, ...new_expenses);

  return { ok: true, data };
};

const filterExpense = ({ month, category_id }) => {
  return expenses
    .filter((exp) => exp.date.startsWith(month))
    .filter((exp) => {
      if (category_id) return exp.category_id === category_id;
      else return true;
    });
};

const findByIdExpense = (id) => {
  return expenses.find((exp) => exp.id === id);
};

export { addExpense, updateExpense, deleteExpense, filterExpense, findByIdExpense };
