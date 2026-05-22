import { http } from "msw";
import { responseSuccess, responseError } from "../../../utils/response";

import {
  addBudget,
  deleteBudget,
  filterMonthBudget,
  findByIdBudget,
  getBudgets,
  updateBudget,
} from "../../../repositories/budgetRepo";
import { validateBudget } from "../../../utils/validation";

const handlers = [
  http.get("/api/budgets", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("month");

    if (query) {
      const filtered = filterMonthBudget(query);
      if (filtered.length === 0)
        return responseError("NOT_FOUND", `Budget in ${query} doesn't exist`, null);

      return responseSuccess("OK", `Budget in ${query}`, filtered);
    }

    const budgets = getBudgets();
    return responseSuccess("OK", "All budget data", budgets);
  }),
  http.post("/api/budgets", async ({ request }) => {
    const budget = await request.json();

    const { valid, errors } = validateBudget(budget);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid budget payload", errors);

    const { ok, data } = addBudget(budget);
    if (ok) return responseSuccess("CREATED", `Create budget with id ${data.id}`, data);
  }),
  http.put("/api/budgets/:id", async ({ request, params }) => {
    const { id } = params;
    const budget = await request.json();

    const isExist = findByIdBudget(id);
    if (!isExist)
      return responseError("NOT_FOUND", `Budget with id ${id} doesn't exist`, null);

    const { valid, errors } = validateBudget(budget);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid budget payload", errors);

    const { ok, data } = updateBudget(id, budget);
    if (ok) return responseSuccess("OK", `Update budget with id ${id}`, data);
  }),
  http.delete("/api/budgets/:id", async ({ params }) => {
    const { id } = params;

    const isExist = findByIdBudget(id);
    if (!isExist)
      return responseError("NOT_FOUND", `Budget with id ${id} doesn't exist`, null);

    const { ok, data } = deleteBudget(id);
    if (ok) return responseSuccess("OK", `Delete budget with id ${id}`, data);
  }),
];

export default handlers;
