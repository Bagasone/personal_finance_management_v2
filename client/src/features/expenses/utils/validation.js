import { EXPENSE_CATEGORIES } from "../../../constants";

const CATEGORIES_ID = EXPENSE_CATEGORIES.map((cat) => cat.id);

const validateDescription = (value) => {
  if (value.trim() === "") return "description is required";

  return null;
};

const validatePositiveNumber = (value) => {
  if (value.trim() === "") return "amount must be a valid number";
  if (isNaN(Number(value))) return "amount must be a valid number";
  if (Number(value) <= 0) return "amount must be greater than 0";

  return null;
};

const validateFormatDate = (value) => {
  if (isNaN(new Date(value).getTime())) return "enter a valid date";

  return null;
};

const validateDateInFuture = (value) => {
  if (new Date(value) > new Date().setHours(23, 59, 59, 999))
    return "date can't be in the future";

  return null;
};

const validateDate = (value) => {
  if (value === "") return "date is required";

  const err1 = validateFormatDate(value);
  if (err1) return err1;

  const err2 = validateDateInFuture(value);
  if (err2) return err2;

  return null;
};

const validateCategory = (value) => {
  if (value === "") return "please select a category";
  if (!CATEGORIES_ID.includes(value)) return "category is not valid";

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
