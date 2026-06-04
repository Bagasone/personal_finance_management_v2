import { http } from "msw";
import { responseSuccess, responseError } from "../../../utils/response";
import { validateBudget } from "../../../utils/validation";

import {
  addBudget,
  deleteBudget,
  filterBudget,
  findByIdBudget,
  updateBudget,
} from "../../../repositories/budgetRepo";

const handlers = [
  http.get("/api/budgets", ({ request }) => {
    const url = new URL(request.url);
    const queries = Object.fromEntries(url.searchParams);

    if (queries.month) {
      const budgets = filterBudget(queries);
      if (budgets.length === 0)
        return responseError("NOT_FOUND", `Budget in ${queries.month} doesn't exist`);

      return responseSuccess("OK", `Budget in ${queries.month}`, budgets);
    }

    return responseError("BAD_REQUEST", "Required month for get budgets");
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
    if (!isExist) return responseError("NOT_FOUND", `Budget with id ${id} doesn't exist`);

    const { valid, errors } = validateBudget(budget);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid budget payload", errors);

    const { ok, data } = updateBudget(id, budget);
    if (ok) return responseSuccess("OK", `Update budget with id ${id}`, data);
  }),
  http.delete("/api/budgets/:id", async ({ params }) => {
    const { id } = params;

    const isExist = findByIdBudget(id);
    if (!isExist) return responseError("NOT_FOUND", `Budget with id ${id} doesn't exist`);

    const { ok, data } = deleteBudget(id);
    if (ok) return responseSuccess("OK", `Delete budget with id ${id}`, data);
  }),
];

export default handlers;
