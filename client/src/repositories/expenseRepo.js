import { expenses } from "../lib/msw/db";
import { getFullDate } from "../utils/date";
import { generateId } from "../utils/generateId";

const getExpenses = () => expenses;

const addExpense = ({ amount, description, categoryId, date }) => {
  const data = {
    id: generateId("exp"),
    amount: Number(amount),
    description,
    categoryId,
    date,
    createdAt: getFullDate(),
  };

  expenses.push(data);
  return { ok: true, data };
};

const updateExpense = (id, { amount, description, categoryId, date }) => {
  const data = {
    amount: Number(amount),
    description,
    categoryId,
    date,
  };

  const index = expenses.findIndex((exp) => exp.id === id);
  expenses[index] = { ...expenses[index], ...data };

  return { ok: true, data };
};

const deleteExpense = (id) => {
  const newExpenses = expenses.filter((exp) => exp.id !== id);
  const data = expenses.splice(0, expenses.length, ...newExpenses);

  return { ok: true, data };
};

const filterMonthExpense = (date) => {
  return expenses.filter((exp) => exp.date.startsWith(date));
};

const findByIdExpense = (id) => {
  return expenses.find((exp) => exp.id === id);
};

export {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  filterMonthExpense,
  findByIdExpense,
};
