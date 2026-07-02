import { EXPENSE_CATEGORIES, INCOME_SOURCES, DEBT_TYPES } from "../constants";

const CATEGORIES_ID = EXPENSE_CATEGORIES.map((cat) => cat.id);
const SOURCES_ID = INCOME_SOURCES.map((src) => src.id);
const DEBT_STATUS = Object.values(DEBT_TYPES);

const validateEmptyString = (value, field) => {
  if (String(value).trim() === "") {
    return `please enter the ${field}`;
  }

  return null;
};

const validateLength = (value, field) => {
  if (String(value).length > 100) {
    return `${field} can't be more than 100 characters`;
  }

  return null;
};

const validateFormatDate = (value, field = "date") => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(value)) {
    return `${field} must be in YYYY-MM-DD format`;
  }

  return null;
};

const validateValueDate = (value, field = "date") => {
  if (isNaN(new Date(value).getTime())) {
    return `${field} must be valid date value`;
  }

  return null;
};

const validateFutureDate = (value, field = "date") => {
  if (new Date(value) > new Date().setHours(23, 59, 59, 999)) {
    return `${field} can't be in the future`;
  }

  return null;
};

const validateSelect = (value, field, select) => {
  if (!select.includes(value)) {
    return `${value} is not valid ${field}`;
  }
};

export const validateDescription = (value, field = "description") => {
  const err1 = validateEmptyString(value, field);
  if (err1) return err1;

  const err2 = validateLength(value, field);
  if (err2) return err2;

  return null;
};

export const validateNote = (value, field = "note") => {
  const err1 = validateLength(value, field);
  if (err1) return err1;

  return null;
};

export const validateNumber = (value, field = "amount") => {
  const err1 = validateEmptyString(value, field);
  if (err1) return err1;

  if (!Number.isFinite(Number(value))) {
    return `${field} must be a valid number`;
  }

  if (Number(value) <= 0) {
    return `${field} must be greater than 0`;
  }

  return null;
};

export const validateAmountPay = (value, field = "amount pay", remainingAmount) => {
  const err1 = validateNumber(value, field);
  if (err1) return err1;

  if (value > remainingAmount) {
    return `${field} can't be more than remaining pay`;
  }

  return null;
};

export const validateDate = (value, field = "date") => {
  const err1 = validateEmptyString(value, field);
  if (err1) return err1;

  const err2 = validateFormatDate(value, field);
  if (err2) return err2;

  const err3 = validateValueDate(value, field);
  if (err3) return err3;

  const err4 = validateFutureDate(value, field);
  if (err4) return err4;

  return null;
};

export const validateMonth = (value, field = "month") => {
  const err1 = validateEmptyString(value, field);
  if (err1) return err1;

  const err2 = validateFormatDate(`${value}-01`, field);
  if (err2) return err2;

  return null;
};

export const validateCategory = (value, field = "category") => {
  const err1 = validateEmptyString(value, field);
  if (err1) return err1;

  const err2 = validateSelect(value, field, CATEGORIES_ID);
  if (err2) return err2;

  return null;
};

export const validateSource = (value, field = "source") => {
  const err1 = validateEmptyString(value, field);
  if (err1) return err1;

  const err2 = validateSelect(value, field, SOURCES_ID);
  if (err2) return err2;

  return null;
};

export const validateType = (value, field = "type") => {
  const err1 = validateEmptyString(value, field);
  if (err1) return err1;

  const err2 = validateSelect(value, field, DEBT_STATUS);
  if (err2) return err2;

  return null;
};

export const validateDueDate = (value, field = "due date") => {
  const err1 = validateFormatDate(value, field);
  if (err1) return err1;

  const err2 = validateValueDate(value, field);
  if (err2) return err2;

  if (new Date(value) <= Date.now()) {
    return `${field} can't be now or past`;
  }

  return null;
};

export const validateExpense = ({ amount, description, categoryId, date }) => {
  const errors = {};

  const err1 = validateNumber(amount, "amount");
  if (err1) errors.amount = err1;

  const err2 = validateDescription(description, "description");
  if (err2) errors.description = err2;

  const err3 = validateCategory(categoryId, "category");
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

  const err1 = validateNumber(amount, "amount");
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

  const err1 = validateNumber(limit, "limit");
  if (err1) errors.limit = err1;

  const err2 = validateCategory(categoryId, "category");
  if (err2) errors.categoryId = err2;

  const err3 = validateMonth(month, "month");
  if (err3) errors.month = err3;

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

export const validateDebt = ({ totalAmount, description, type, dueDate }) => {
  const errors = {};

  const err1 = validateNumber(totalAmount, "total amount");
  if (err1) errors.totalAmount = err1;

  const err2 = validateDescription(description, "description");
  if (err2) errors.description = err2;

  const err3 = validateType(type, "type");
  if (err3) errors.type = err3;

  if (dueDate) {
    const err4 = validateDueDate(dueDate, "due date");
    if (err4) errors.dueDate = err4;
  }

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

export const validatePayment = ({ amount, date, note }, remainingAmount) => {
  const errors = {};

  const err1 = validateAmountPay(amount, "amount pay", remainingAmount);
  if (err1) errors.amount = err1;

  const err2 = validateDate(date, "date");
  if (err2) errors.date = err2;

  if (note) {
    const err3 = validateNote(note);
    if (err3) errors.note = err3;
  }

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};
