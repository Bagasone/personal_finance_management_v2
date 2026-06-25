import {
  validateDescription,
  validateNumber,
  validateCategory,
  validateDate,
} from "../../../utils/validation";

export const validate = ({ amount, description, categoryId, date }) => {
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
