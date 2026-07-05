import { budgets } from "../lib/msw/db";
import { generateId } from "../utils/generateId";
import { getFullDate } from "../utils/date";

const addBudget = ({ limit, categoryId, month }) => {
  const data = {
    id: generateId("bud"),
    limit: Number(limit),
    categoryId,
    month,
    createdAt: getFullDate(),
  };

  budgets.push(data);
  return { ok: true, data };
};

const updateBudget = (id, { limit, categoryId, month }) => {
  const data = {
    limit: Number(limit),
    categoryId,
    month,
  };

  const index = budgets.findIndex((bud) => bud.id === id);
  budgets[index] = { ...budgets[index], ...data };

  return { ok: true, data };
};

const deleteBudget = (id) => {
  const newBudgets = budgets.filter((bud) => bud.id !== id);
  const data = budgets.splice(0, budgets.length, ...newBudgets);

  return { ok: true, data };
};

const filterBudget = ({ month }) => {
  return budgets.filter((bud) => bud.month.startsWith(month));
};

const findByIdBudget = (id) => {
  return budgets.find((bud) => bud.id === id);
};

const findBudgetCategoryandMonth = (categoryId, month) => {
  return budgets.find((bud) => bud.categoryId === categoryId && bud.month === month);
};

export {
  addBudget,
  updateBudget,
  deleteBudget,
  filterBudget,
  findByIdBudget,
  findBudgetCategoryandMonth,
};
