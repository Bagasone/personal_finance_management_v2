import { http } from "msw";
import { responseSuccess, responseError } from "../../../utils/response";
import { validateExpense } from "../../../utils/validation";

import {
  addExpense,
  filterExpense,
  findByIdExpense,
  updateExpense,
  deleteExpense,
} from "../../../repositories/expenseRepo";

const handlers = [
  http.get("/api/expenses", ({ request }) => {
    const url = new URL(request.url);
    const queries = Object.fromEntries(url.searchParams);

    if (queries.month) {
      const expenses = filterExpense(queries);

      if (expenses.length === 0)
        return responseError(
          "NOT_FOUND",
          `Expense with filter ${queries.categoryId || queries.month} doesn't exist`,
        );

      return responseSuccess("OK", `Expense in ${queries.month}`, expenses);
    }

    return responseError("BAD_REQUEST", "Required month for get expenses");
  }),
  http.post("/api/expenses", async ({ request }) => {
    const expense = await request.json();

    const { valid, errors } = validateExpense(expense);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid expense payload", errors);

    const { ok, data } = addExpense(expense);
    if (ok) return responseSuccess("CREATED", `Create expense with id: ${data.id}`, data);
  }),
  http.put("/api/expenses/:id", async ({ params, request }) => {
    const { id } = params;
    const expense = await request.json();

    const isExist = findByIdExpense(id);
    if (!isExist)
      return responseError("NOT_FOUND", `Expense with id ${id} doesn't exist`);

    const { valid, errors } = validateExpense(expense);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid expense payload", errors);

    const { ok, data } = updateExpense(id, expense);
    if (ok) return responseSuccess("OK", `Update expense with id: ${id}`, data);
  }),
  http.delete("/api/expenses/:id", async ({ params }) => {
    const { id } = params;

    const isExist = findByIdExpense(id);
    if (!isExist)
      return responseError("NOT_FOUND", `Expense with id ${id} doesn't exist`);

    const { ok, data } = deleteExpense(id);

    if (ok) return responseSuccess("OK", `Delete expense with id: ${id}`, data);
  }),
];

export default handlers;
