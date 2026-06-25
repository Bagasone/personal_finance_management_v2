import { useEffect, useReducer } from "react";

import { INCOME_SOURCES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { getShortDate } from "../../../utils/date";
import { validate } from "../utils/validation";

const initialState = {
  description: "",
  amount: "",
  sourceId: "",
  date: getShortDate(),
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    case "PREFILL": {
      const { description, amount, sourceId, date } = action.payload;
      return { ...initialState, description, amount: String(amount), sourceId, date };
    }
    case "INVALID": {
      return { ...state, errors: action.payload };
    }
    case "RESET":
      return initialState;
  }
};

const IncomeForm = ({ initialData, onSubmit, onCancel, serverError }) => {
  const [form, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialData) dispatch({ type: "PREFILL", payload: initialData });
    else dispatch({ type: "RESET" });
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = validate(form);
    if (valid) {
      const { errors, ...data } = form;
      onSubmit(data);
    } else dispatch({ type: "INVALID", payload: errors });
  };

  return (
    <div className="w-72 lex flex-col justify-start items-start gap-3 px-3 py-1">
      <h2 className="text-xl font-bold">{initialData ? "Edit" : "Add"} Income Form</h2>
      {serverError && <ErrorMessage message={serverError} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
        <Input
          type="text"
          label="Description"
          id="description"
          value={form.description}
          error={form.errors.description}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "description",
              payload: e.target.value,
            })
          }
        />
        <Input
          type="number"
          label="Amount"
          id="amount"
          value={form.amount}
          error={form.errors?.amount}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "amount",
              payload: e.target.value,
            })
          }
        />
        <Select
          label="Source"
          id="sourceId"
          value={form.sourceId}
          error={form.errors?.sourceId}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "sourceId",
              payload: e.target.value,
            })
          }
          options={INCOME_SOURCES}>
          <Option
            label="Select Source"
            value=""
          />
        </Select>
        <Input
          type="date"
          label="Date"
          id="date"
          value={form.date}
          error={form.errors?.date}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "date",
              payload: e.target.value,
            })
          }
        />
        <div className="flex gap-3">
          <Button
            type="submit"
            label={`${initialData ? "Update" : "Add"} Income`}
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

export default IncomeForm;
