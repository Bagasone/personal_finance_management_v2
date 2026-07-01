import { useReducer, useEffect } from "react";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { DEBT_TYPES } from "../../../constants/";

import { validate } from "../utils/validation";

const initialState = {
  type: "owe",
  description: "",
  totalAmount: "",
  dueDate: "",
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    case "INVALID":
      return { ...state, errors: action.payload };
    case "RESET":
      return initialState;
    case "PREFILL": {
      const { type, description, totalAmount, dueDate } = action.payload;
      return {
        ...initialState,
        type,
        description,
        totalAmount: String(totalAmount),
        dueDate,
      };
    }
  }
};

const DebtForm = ({ initialData, onSubmit, onCancel, serverError }) => {
  const [form, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialData) dispatch({ type: "PREFILL", payload: initialData });
    else dispatch({ type: "RESET" });
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = validate(form);
    if (valid) {
      const { errors, ...formData } = form;
      onSubmit(formData);
    } else dispatch({ type: "INVALID", payload: errors });
  };

  return (
    <div className="w-72 lex flex-col justify-start items-start gap-3 px-3 py-1">
      <h2 className="text-xl font-bold">{initialData ? "Edit" : "Add"} Debt Form</h2>
      {serverError && <ErrorMessage message={serverError} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
        <fieldset className="flex justify-between items-center">
          <div className="flex flex-col text-sm">
            <label htmlFor="type-owe">I owe to someone</label>
            <input
              type="radio"
              id="type-owe"
              name="type"
              value={DEBT_TYPES.OWE}
              checked={form.type === DEBT_TYPES.OWE}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "type", payload: e.target.value })
              }
              className="w-full border px-3 py-1 rounded-sm text-sm cursor-pointer"
            />
          </div>
          <div className="flex flex-col text-sm">
            <label htmlFor="type-owed">I owed to someone</label>
            <input
              type="radio"
              id="type-owed"
              name="type"
              value={DEBT_TYPES.OWED}
              checked={form.type === DEBT_TYPES.OWED}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "type", payload: e.target.value })
              }
              className="w-full border px-3 py-1 rounded-sm text-sm cursor-pointer"
            />
          </div>
        </fieldset>
        <Input
          type="text"
          label="Description"
          id="description"
          value={form.description}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "description", payload: e.target.value })
          }
          error={form.errors.description}
        />
        <Input
          type="number"
          label="Total Amount"
          id="totalAmount"
          value={form.totalAmount}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "totalAmount", payload: e.target.value })
          }
          error={form.errors.totalAmount}
        />
        <Input
          type="date"
          label="Due Date"
          id="dueDate"
          value={form.dueDate}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "dueDate", payload: e.target.value })
          }
          error={form.errors.dueDate}
        />
        <div className="flex gap-3">
          <Button
            type="submit"
            label={`${initialData ? "Update" : "Add"} Debt`}
          />
          <Button
            type="button"
            label="Cancel"
            onClick={onCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default DebtForm;
