import { incomes } from "../lib/msw/db";
import { getFullDate } from "../utils/date";
import { generateId } from "../utils/generateId";

const addIncome = ({ amount, sourceId, description, date }) => {
  const data = {
    id: generateId("inc"),
    amount: Number(amount),
    sourceId,
    description,
    date,
    createdAt: getFullDate(),
  };

  incomes.push(data);
  return { ok: true, data };
};

const updateIncome = (id, { amount, description, sourceId, date }) => {
  const data = {
    amount: Number(amount),
    description,
    sourceId,
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

const filterIncome = ({ month, sourceId }) => {
  return incomes
    .filter((inc) => inc.date.startsWith(month))
    .filter((inc) => {
      if (sourceId) return inc.sourceId === sourceId;
      else return true;
    });
};

const findByIdIncome = (id) => {
  return incomes.find((inc) => inc.id === id);
};

export { filterIncome, addIncome, updateIncome, deleteIncome, findByIdIncome };
