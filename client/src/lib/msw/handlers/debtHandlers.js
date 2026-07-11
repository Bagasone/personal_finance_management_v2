import { http } from "msw";
import { validateDebt, validatePayment } from "../../../utils/validation";
import { responseSuccess, responseError } from "../../../utils/response";
import { formatMonth } from "../../../utils/formatter";

import {
  getDebts,
  addDebt,
  updateDebt,
  deleteDebt,
  addPayment,
  findByIdDebt,
} from "../../../repositories/debtRepo";

const handlers = [
  http.get("/api/debts", () => {
    const debts = getDebts();
    return responseSuccess("OK", "All debt data", debts);
  }),
  http.post("/api/debts", async ({ request }) => {
    const debt = await request.json();

    const { valid, errors } = validateDebt(debt);
    if (!valid) return responseError("BAD_REQUEST", "Invalid debt data", errors);

    const { ok, data } = addDebt(debt);
    if (ok) return responseSuccess("CREATED", `Create debt with id ${data.id}`, data);
  }),
  http.put("/api/debts/:id", async ({ request, params }) => {
    const { id } = params;
    const debt = await request.json();

    const is_exist = findByIdDebt(id);
    if (!is_exist) return responseError("NOT_FOUND", `Debt with id ${id} doesn't exist`);

    const { valid, errors } = validateDebt(debt);
    if (!valid) return responseError("BAD_REQUEST", "Invalid debt data", errors);

    const { ok, data } = updateDebt(id, debt);
    if (ok) return responseSuccess("OK", `Update debt with id ${id}`, data);
  }),
  http.delete("/api/debts/:id", async ({ params }) => {
    const { id } = params;

    const is_exist = findByIdDebt(id);
    if (!is_exist) return responseError("NOT_FOUND", `Debt with id ${id} doesn't exist`);

    const { ok, data } = deleteDebt(id);
    if (ok) return responseSuccess("OK", `Delete debt with id ${id}`, data);
  }),
  http.post("/api/debts/:id/payments", async ({ params, request }) => {
    const { id } = params;
    const payment = await request.json();

    const is_exist = findByIdDebt(id);
    if (!is_exist) return responseError("NOT_FOUND", `Debt with id ${id} doesn't exist`);

    const { valid, errors } = validatePayment(payment);
    if (!valid) return responseError("BAD_REQUEST", "Invalid payment data", errors);

    if (payment.amount > findByIdDebt(id).remaining_amount)
      return responseError("BAD_REQUEST", "Invalid payment data", {
        ...errors,
        amount: "Amount pay can't more than remaining",
      });

    const { ok, data } = addPayment(id, payment);
    const paymentId = data.payments[data.payments.length - 1].id;

    if (ok)
      return responseSuccess("CREATED", `Created payment with id ${paymentId}`, data);
  }),
];

export default handlers;
