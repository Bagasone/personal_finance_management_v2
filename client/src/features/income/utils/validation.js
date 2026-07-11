import {
  validateDescription,
  validateNumber,
  validateSource,
  validateDate,
} from "../../../utils/validation";

export const validate = ({ description, amount, source_id, date }) => {
  const errors = {};

  const err1 = validateDescription(description, "description");
  if (err1) errors.description = err1;

  const err2 = validateNumber(amount, "amount");
  if (err2) errors.amount = err2;

  const err3 = validateSource(source_id, "source");
  if (err3) errors.source_id = err3;

  const err4 = validateDate(date, "date");
  if (err4) errors.date = err4;

  if (Object.keys(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};
