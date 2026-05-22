import { HttpResponse } from "msw";

export const responseSuccess = (code, message, data) =>
  HttpResponse.json({
    ok: true,
    code,
    message,
    data,
  });

export const responseError = (code, message, errors = null) =>
  HttpResponse.json({
    ok: false,
    code,
    message,
    errors,
  });
