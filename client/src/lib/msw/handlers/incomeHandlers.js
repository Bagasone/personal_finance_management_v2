import { http } from "msw";
import { responseSuccess, responseError } from "../../../utils/response";
import { validateIncome } from "../../../utils/validation";

import {
  addIncome,
  updateIncome,
  deleteIncome,
  filterIncome,
  findByIdIncome,
} from "../../../repositories/incomeRepo";

const handlers = [
  http.get("/api/incomes", ({ request }) => {
    const url = new URL(request.url);
    const queries = Object.fromEntries(url.searchParams);

    if (queries.month) {
      const incomes = filterIncome(queries);

      if (incomes.length === 0)
        return responseError(
          "NOT_FOUND",
          `Income with filter ${queries.source || queries.month} doesn't exist`,
        );

      return responseSuccess("OK", `Income in ${queries.month}`, incomes);
    }

    return responseError("BAD_REQUEST", "Required month for get incomes");
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
