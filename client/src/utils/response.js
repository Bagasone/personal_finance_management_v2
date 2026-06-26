import { HttpResponse } from "msw";

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const responseSuccess = (status, message, data) =>
  HttpResponse.json(
    {
      message,
      data,
    },
    {
      status: STATUS_CODE[status] || STATUS_CODE[SUCCESS],
    },
  );

export const responseError = (status, message, errors = null) =>
  HttpResponse.json(
    {
      message,
      errors,
    },
    { status: STATUS_CODE[status] || STATUS_CODE[SERVER_ERROR] },
  );
