import { EXPENSE_CATEGORIES, INCOME_SOURCES, DEBT_TYPES } from "../constants";

const CATEGORIES_ID = EXPENSE_CATEGORIES.map((cat) => cat.id);
const SOURCE_STATUS = INCOME_SOURCES.map((src) => src.id);
const DEBT_STATUS = Object.keys(DEBT_TYPES);

export const validateDescription = (value, field = "description") => {
  if (typeof value !== "string" || value.trim() === "") {
    return `${field} is required`;
  }

  return null;
};

export const validateNumber = (value, field = "amount") => {
  if (value === "") return `${field} must be a valid number`;
  if (isNaN(Number(value))) return `${field} must be a valid number`;
  if (Number(value) <= 0) return `${field} must be greater than 0`;

  return null;
};

const validatePositiveNumber = (value, field = "amount") => {
  const numVal = Number(value);

  if (!Number.isFinite(numVal)) {
    return `${field} must be a valid number`;
  }

  if (numVal <= 0) {
    return `${field} must be greater than 0`;
  }

  return null;
};

const validateFormatDate = (value, field = "date") => {
  if (isNaN(new Date(value).getTime())) {
    return `${field} must be valid date format`;
  }

  return null;
};

const validateDateInFuture = (value, field = "date") => {
  if (new Date(value) > new Date().setHours(23, 59, 59, 999)) {
    return `${field} can't be in the future`;
  }

  return null;
};

export const validateDate = (value, field = "date") => {
  const err1 = validateFormatDate(value, field);
  if (err1) return err1;

  const err2 = validateDateInFuture(value, field);
  if (err2) return err2;

  return null;
};

const validateMonth = (value, field = "month") => {
  if (!/^\d{4}-\d{2}$/.test(value)) return `${field} must be in YYYY-MM format`;

  return null;
};

export const validateCategory = (value, field = "category") => {
  if (value === "") return `please select a ${field}`;
  if (!CATEGORIES_ID.includes(value)) return `${field} is not valid`;

  return null;
};

export const validateSource = (value, field = "source") => {
  if (value === "") return `please select a ${field}`;
  if (!SOURCE_STATUS.includes(value)) return `${field} is not valid`;

  return null;
};

export const validateType = (value, field = "type") => {
  if (value === "") return `please select a ${field}`;
  if (!DEBT_STATUS.includes(value)) return `${field} type is not valid`;

  return null;
};

export const validateExpense = ({ amount, description, categoryId, date }) => {
  const errors = {};

  const err1 = validatePositiveNumber(amount, "amount");
  if (err1) errors.amount = err1;

  const err2 = validateDescription(description, "description");
  if (err2) errors.description = err2;

  const err3 = validateCategory(categoryId);
  if (err3) errors.categoryId = err3;

  const err4 = validateDate(date, "date");
  if (err4) errors.date = err4;

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

export const validateIncome = ({ amount, description, sourceId, date }) => {
  const errors = {};

  const err1 = validatePositiveNumber(amount, "amount");
  if (err1) errors.amount = err1;

  const err2 = validateDescription(description, "description");
  if (err2) errors.description = err2;

  const err3 = validateSource(sourceId, "source");
  if (err3) errors.sourceId = err3;

  const err4 = validateDate(date, "date");
  if (err4) errors.date = err4;

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

export const validateBudget = ({ limit, categoryId, month }) => {
  const errors = {};

  const err1 = validatePositiveNumber(limit, "limit");
  if (err1) errors.limit = err1;

  const err2 = validateCategory(categoryId);
  if (err2) errors.categoryId = err2;

  const err3 = validateMonth(month);
  if (err3) errors.month = err3;

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

export const validateDebt = ({ totalAmount, description, type, dueDate }) => {
  const errors = {};

  const err1 = validatePositiveNumber(totalAmount, "total amount");
  if (err1) errors.totalAmount = err1;

  const err2 = validateDescription(description, "description");
  if (err2) errors.description = err2;

  const err3 = validateType(type, "type");
  if (err3) errors.type = err3;

  if (dueDate) {
    const err4 = validateFormatDate(dueDate, "due date");
    if (err4) errors.dueDate = err4;
  }

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

export const validatePayment = ({ amount, date }) => {
  const errors = {};

  const err1 = validatePositiveNumber(amount, "amount");
  if (err1) errors.amount = err1;

  const err2 = validateDate(date, "date");
  if (err2) errors.date = err2;

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};
