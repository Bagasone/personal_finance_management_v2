import { useReducer, useEffect } from "react";

import useForm from "../../../hooks/useForm";

import { validate } from "../utils/validation";
import { errorField } from "../../../utils/error";

import { DEBT_TYPES } from "../../../constants/";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

const DebtForm = ({ initial_data, onSubmit, onCancel, server_errors }) => {
  const [form, dispatch] = useForm({
    type: "owe",
    description: "",
    total_amount: "",
    due_date: "",
  });

  useEffect(() => {
    if (initial_data) dispatch({ type: "PREFILL", payload: initial_data });
    else dispatch({ type: "RESET" });
  }, [initial_data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_ERROR" });

    const { valid, errors } = validate(form);
    if (valid) {
      const { errors, ...formData } = form;
      onSubmit(formData);
    } else dispatch({ type: "INVALID", payload: errors });
  };

  const error = errorField(form.errors, server_errors.fields);

  return (
    <div className="w-72 lex flex-col justify-start items-start gap-3 px-3 py-1">
      <h2 className="text-xl font-bold">{initial_data ? "Edit" : "Add"} Debt Form</h2>
      {server_errors && <ErrorMessage message={server_errors.message} />}
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
          error={error("description")}
        />
        <Input
          type="number"
          label="Total Amount"
          id="total_amount"
          value={form.total_amount}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "total_amount",
              payload: e.target.value,
            })
          }
          error={error("total_amount")}
        />
        <Input
          type="date"
          label="Due Date"
          id="due_date"
          value={form.due_date}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "due_date", payload: e.target.value })
          }
          error={error("due_date")}
        />
        <div className="flex gap-3">
          <Button
            type="submit"
            label={`${initial_data ? "Update" : "Add"} Debt`}
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
