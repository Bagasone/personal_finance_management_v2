import { http } from "msw";
import { responseSuccess, responseError } from "../../../utils/response";

import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
  filterMonthIncome,
  findByIdIncome,
} from "../../../repositories/incomceRepo";
import { validateIncome } from "../../../utils/validation";

const handlers = [
  http.get("/api/incomes", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("month");

    if (query) {
      const filtered = filterMonthIncome(query);

      if (filtered.length === 0)
        return responseError("NOT_FOUND", `Income in ${query} doesn't exist`);

      return responseSuccess("OK", `Income in ${query}`, filtered);
    }

    const incomes = getIncomes();
    return responseSuccess("OK", "All income data", incomes);
  }),

  http.post("/api/incomes", async ({ request }) => {
    const income = await request.json();

    const { valid, errors } = validateIncome(income);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid income payload", errors);

    const { ok, data } = addIncome(income);

    if (ok) return responseSuccess("CREATED", `Create income with id: ${data.id}`, data);
  }),
  http.put("/api/incomes/:id", async ({ params, request }) => {
    const { id } = params;
    const income = await request.json();

    const isExist = findByIdIncome(id);
    if (!isExist) return responseError("NOT_FOUND", `Income with id ${id} doesn't exist`);

    const { valid, errors } = validateIncome(income);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid income payload", errors);

    const { ok, data } = updateIncome(id, income);

    if (ok) return responseSuccess("OK", `Update income with id: ${id}`, data);
  }),
  http.delete("/api/incomes/:id", async ({ params }) => {
    const { id } = params;

    const isExist = findByIdIncome(id);
    if (!isExist) return responseError("NOT_FOUND", `Income with id ${id} doesn't exist`);

    const { ok, data } = deleteIncome(id);

    if (ok) return responseSuccess("OK", `Delete income with id: ${id}`, data);
  }),
];

export default handlers;
