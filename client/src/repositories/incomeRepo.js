import { incomes } from "../lib/msw/db";
import { getFullDate } from "../utils/date";
import { generateId } from "../utils/generateId";

const getIncomes = () => incomes;

const addIncome = ({ amount, source, description, date }) => {
  const data = {
    id: generateId("inc"),
    amount: Number(amount),
    source,
    description,
    date,
    createdAt: getFullDate(),
  };

  incomes.push(data);
  return { ok: true, data };
};

const updateIncome = (id, { amount, description, source, date }) => {
  const data = {
    amount: Number(amount),
    description,
    source,
    date,
  };

  const index = incomes.findIndex((inc) => inc.id === id);
  incomes[index] = { ...incomes[index], ...data };

  return { ok: true, data };
};

const deleteIncome = (id) => {
  const newincomes = incomes.filter((inc) => inc.id !== id);
  const data = incomes.splice(0, incomes.length, ...newincomes);

  return { ok: true, data };
};

const filterIncome = ({ month, source }) => {
  return incomes
    .filter((inc) => inc.date.startsWith(month))
    .filter((inc) => {
      if (source !== "") {
        return inc.source === source;
      }
      return true;
    });
};

const findByIdIncome = (id) => {
  return incomes.find((inc) => inc.id === id);
};

export {
  getIncomes,
  filterIncome,
  addIncome,
  updateIncome,
  deleteIncome,
  findByIdIncome,
};
