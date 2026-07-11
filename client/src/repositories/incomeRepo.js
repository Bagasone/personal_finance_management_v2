import { incomes } from "../lib/msw/db";
import { getFullDate } from "../utils/date";
import { generateId } from "../utils/generateId";

const addIncome = ({ amount, source_id, description, date }) => {
  const data = {
    id: generateId("inc"),
    amount: Number(amount),
    source_id,
    description,
    date,
    created_at: getFullDate(),
  };

  incomes.push(data);
  return { ok: true, data };
};

const updateIncome = (id, { amount, description, source_id, date }) => {
  const data = {
    amount: Number(amount),
    description,
    source_id,
    date,
  };

  const index = incomes.findIndex((inc) => inc.id === id);
  incomes[index] = { ...incomes[index], ...data };

  return { ok: true, data };
};

const deleteIncome = (id) => {
  const new_incomes = incomes.filter((inc) => inc.id !== id);
  const data = incomes.splice(0, incomes.length, ...new_incomes);

  return { ok: true, data };
};

const filterIncome = ({ month, source_id }) => {
  return incomes
    .filter((inc) => inc.date.startsWith(month))
    .filter((inc) => {
      if (source_id) return inc.source_id === source_id;
      else return true;
    });
};

const findByIdIncome = (id) => {
  return incomes.find((inc) => inc.id === id);
};

export { filterIncome, addIncome, updateIncome, deleteIncome, findByIdIncome };
