import {
  validateDescription,
  validateDate,
  validateDueDate,
  validateNote,
  validateAmountPay,
  validateNumber,
} from "../../../utils/validation";

export const validate = ({ description, total_amount, due_date }) => {
  const errors = {};

  const err1 = validateDescription(description);
  if (err1) errors.description = err1;

  const err2 = validateNumber(total_amount);
  if (err2) errors.total_amount = err2;

  if (due_date) {
    const err3 = validateDueDate(due_date);
    if (err3) errors.due_date = err3;
  }

  if (Object.entries(errors).length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

export const validatePayment = ({ amount, date, note }, remaining_amount) => {
  const errors = {};

  const err1 = validateAmountPay(amount, "amount pay", remaining_amount);
  if (err1) errors.amount = err1;

  const err2 = validateDate(date);
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
