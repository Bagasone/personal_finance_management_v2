import { useEffect, useReducer } from "react";
import { validateExpense } from "../utils/validation";

import { EXPENSE_CATEGORIES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { getShortDate } from "../../../utils/date";

const initialState = {
  description: "",
  amount: "",
  categoryId: "",
  date: getShortDate(),
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_CATEGORY":
      return { ...state, categoryId: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "PREFILL": {
      const { description, amount, categoryId, date } = action.payload;
      return {
        ...initialState,
        description,
        amount: String(amount),
        categoryId,
        date,
      };
    }
    case "INVALID":
      return { ...state, errors: action.payload };
    case "RESET":
      return initialState;
  }
};

const ExpenseForm = ({ initialData, onSubmit, onCancel, serverError }) => {
  const [form, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialData) dispatch({ type: "PREFILL", payload: initialData });
    else dispatch({ type: "RESET" });
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = validateExpense(form);
    if (valid) {
      // eslint-disable-next-line no-unused-vars
      const { errors, ...formData } = form;
      onSubmit(formData);
      dispatch({ type: "RESET" });
    } else dispatch({ type: "INVALID", payload: errors });
  };

  return (
    <div className="flex flex-col justify-start items-start gap-3 w-full h-full">
      <h2 className="text-xl font-bold">
        {initialData ? "Edit" : "Add"} Expense Form
      </h2>
      {serverError && <ErrorMessage message={serverError} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full"
      >
        <Input
          type="text"
          label="Description"
          id="description"
          value={form.description}
          error={form.errors.description}
          onChange={(e) =>
            dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
          }
        />
        <Input
          type="number"
          label="Amount"
          id="amount"
          value={form.amount}
          error={form.errors.amount}
          onChange={(e) =>
            dispatch({ type: "SET_AMOUNT", payload: e.target.value })
          }
        />
        <Select
          label="Category"
          id="categoryId"
          value={form.categoryId}
          error={form.errors.categoryId}
          onChange={(e) =>
            dispatch({ type: "SET_CATEGORY", payload: e.target.value })
          }
          options={EXPENSE_CATEGORIES}
        >
          <Option label="Select Category" value="" />
        </Select>
        <Input
          type="date"
          label="Date"
          id="date"
          value={form.date}
          error={form.errors.date}
          onChange={(e) =>
            dispatch({ type: "SET_DATE", payload: e.target.value })
          }
        />
        <Button
          type="submit"
          label={`${initialData ? "Update" : "Add"} Expense`}
        />
        {initialData && (
          <Button type="button" label="Cancel" onClick={onCancel} />
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
