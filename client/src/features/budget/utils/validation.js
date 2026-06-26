import {
  validateCategory,
  validateMonth,
  validateNumber,
} from "../../../utils/validation";

export const validate = ({ categoryId, month, limit }) => {
  const errors = {};

  const err1 = validateCategory(categoryId, "category");
  if (err1) errors.categoryId = err1;

  const err2 = validateMonth(month, "month");
  if (err2) errors.month = err2;

  const err3 = validateNumber(limit, "limit");
  if (err3) errors.limit = err3;

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};
