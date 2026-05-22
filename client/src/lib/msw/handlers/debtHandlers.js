import { http } from "msw";
import { responseSuccess, responseError } from "../../../utils/response";

import {
  getDebts,
  addDebt,
  updateDebt,
  deleteDebt,
  addPayment,
  findByIdDebt,
} from "../../../repositories/debtRepo";
import { validateDebt, validatePayment } from "../../../utils/validation";

const handlers = [
  http.get("/api/debts", () => {
    const debts = getDebts();
    return responseSuccess("OK", "All debt data", debts);
  }),
  http.post("/api/debts", async ({ request }) => {
    const debt = await request.json();

    const { valid, errors } = validateDebt(debt);
    if (!valid) return responseError("VALIDATION_ERROR", "Invalid debt payload", errors);

    const { ok, data } = addDebt(debt);
    if (ok) return responseSuccess("CREATED", `Create debt with id ${data.id}`, data);
  }),
  http.put("/api/debts/:id", async ({ request, params }) => {
    const { id } = params;
    const debt = await request.json();

    const isExist = findByIdDebt(id);
    if (!isExist)
      return responseError("NOT_FOUND", `Debt with id ${id} doesn't exist`, null);

    const { valid, errors } = validateDebt(debt);
    if (!valid) return responseError("VALIDATION_ERROR", "Invalid debt payload", errors);

    const { ok, data } = updateDebt(id, debt);
    if (ok) return responseSuccess("OK", `Update debt with id ${id}`, data);
  }),
  http.delete("/api/debts/:id", async ({ params }) => {
    const { id } = params;

    const isExist = findByIdDebt(id);
    if (!isExist)
      return responseError("NOT_FOUND", `Debt with id ${id} doesn't exist`, null);

    const { ok, data } = deleteDebt(id);
    if (ok) return responseSuccess("OK", `Delete debt with id ${id}`, data);
  }),
  http.post("/api/debts/:id/payments", async ({ params, request }) => {
    const { id } = params;
    const payment = await request.json();

    const isExist = findByIdDebt(id);
    if (!isExist)
      return responseError("NOT_FOUND", `Debt with id ${id} doesn't exist`, null);

    const { valid, errors } = validatePayment(payment);
    if (!valid)
      return responseError("VALIDATION_ERROR", "Invalid payment payload", errors);

    const { ok, data } = addPayment(id, payment);
    if (ok) return responseSuccess("CREATED", `Created payment with id ${data.id}`, data);
  }),
];

export default handlers;
