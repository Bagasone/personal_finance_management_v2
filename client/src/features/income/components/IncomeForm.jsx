import { useEffect, useRef } from "react";

import useForm from "../../../hooks/useForm";

import { INCOME_SOURCES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { getShortDate } from "../../../utils/date";
import { validate } from "../utils/validation";

const IncomeForm = ({ initialData, onSubmit, onCancel, serverErrors }) => {
  const [form, dispatch] = useForm({
    description: "",
    amount: "",
    sourceId: "",
    date: getShortDate(),
  });

  const firstInputRef = useRef(null);
  const fieldError = (field) => form.errors[field] || serverErrors?.fields[field];

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

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
      {serverErrors && <ErrorMessage message={serverErrors.message} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
        <Input
          ref={firstInputRef}
          type="text"
          label="Description"
          id="description"
          value={form.description}
          error={fieldError("description")}
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
          error={fieldError("amount")}
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
          error={fieldError("sourceId")}
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
          error={fieldError("date")}
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
