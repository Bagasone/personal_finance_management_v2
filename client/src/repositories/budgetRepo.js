import { budgets } from "../lib/msw/db";
import { generateId } from "../utils/generateId";
import { getFullDate } from "../utils/date";

const addBudget = ({ limit, category_id, month }) => {
  const data = {
    id: generateId("bud"),
    limit: Number(limit),
    category_id,
    month,
    created_at: getFullDate(),
  };

  budgets.push(data);
  return { ok: true, data };
};

const updateBudget = (id, { limit, category_id, month }) => {
  const index = budgets.findIndex((bud) => bud.id === id);
  budgets[index] = { ...budgets[index], limit: Number(limit), category_id, month };

  return { ok: true, data: budgets[index] };
};

const deleteBudget = (id) => {
  const new_budgets = budgets.filter((bud) => bud.id !== id);
  const data = budgets.splice(0, budgets.length, ...new_budgets);

  return { ok: true, data };
};

const filterBudget = ({ month }) => {
  return budgets.filter((bud) => bud.month.startsWith(month));
};

const findByIdBudget = (id) => {
  return budgets.find((bud) => bud.id === id);
};

const findBudgetCategoryandMonth = (category_id, month) => {
  return budgets.find((bud) => bud.category_id === category_id && bud.month === month);
};

export {
  addBudget,
  updateBudget,
  deleteBudget,
  filterBudget,
  findByIdBudget,
  findBudgetCategoryandMonth,
};
