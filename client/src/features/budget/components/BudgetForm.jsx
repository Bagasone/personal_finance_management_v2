import { useReducer, useEffect } from "react";

import { EXPENSE_CATEGORIES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { validate } from "../utils/validation";
import { getYearMonthDate } from "../../../utils/date";

const initialState = {
  categoryId: "",
  limit: "",
  month: getYearMonthDate(),
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    case "INVALID":
      return { ...state, errors: action.payload };
    case "PREFILL": {
      const { categoryId, limit, month } = action.payload;
      return { ...initialState, categoryId, limit: String(limit), month };
    }
    case "RESET":
      return initialState;
  }
};

const BudgetForm = ({ initialData, onSubmit, onCancel, serverError }) => {
  const [form, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = validate(form);
    if (valid) {
      const { errors, ...formData } = form;
      onSubmit(formData);
    } else dispatch({ type: "INVALID", payload: errors });
  };

  useEffect(() => {
    if (initialData) dispatch({ type: "PREFILL", payload: initialData });
    else dispatch({ type: "RESET" });
  }, [initialData]);

  return (
    <div className="flex flex-col justify-start items-start gap-3 w-full">
      <h2 className="text-xl font-bold">{initialData ? "Edit" : "Add"} Budget Form</h2>
      {serverError && <ErrorMessage message={serverError} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
        <Select
          label="Category"
          id="categoryId"
          value={form.categoryId}
          error={form.errors.categoryId}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "categoryId",
              payload: e.target.value,
            })
          }
          options={EXPENSE_CATEGORIES}>
          <Option
            label="Select Category"
            value=""
          />
        </Select>
        <Input
          type="number"
          label="Limit"
          id="limit"
          value={form.limit}
          error={form.errors.limit}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "limit",
              payload: e.target.value,
            })
          }
        />
        <Input
          type="month"
          label="Month"
          id="month"
          value={form.month}
          error={form.errors.month}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "month",
              payload: e.target.value,
            })
          }
        />
        <Button
          type="submit"
          label={`${initialData ? "Update" : "Add"} Budget`}
        />
        <Button
          type="button"
          label="Cancel"
          onClick={onCancel}
        />
      </form>
    </div>
  );
};

export default BudgetForm;
