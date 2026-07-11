import { useEffect, useRef } from "react";

import useForm from "../../../hooks/useForm";

import { INCOME_SOURCES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { getDate } from "../../../utils/date";
import { validate } from "../utils/validation";
import { errorField } from "../../../utils/error";

const IncomeForm = ({ initial_data, onSubmit, onCancel, server_errors }) => {
  const [form, dispatch] = useForm({
    description: "",
    amount: "",
    source_id: "",
    date: getDate(),
  });

  const first_input_ref = useRef(null);
  const error = errorField(form?.errors, server_errors?.fields);

  useEffect(() => {
    first_input_ref.current?.focus();
  }, []);

  useEffect(() => {
    if (initial_data) dispatch({ type: "PREFILL", payload: initial_data });
    else dispatch({ type: "RESET" });
  }, [initial_data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_ERROR" });

    const { valid, errors } = validate(form);
    if (valid) {
      const { errors, ...data } = form;
      onSubmit(data);
    } else dispatch({ type: "INVALID", payload: errors });
  };

  return (
    <div className="w-72 lex flex-col justify-start items-start gap-3 px-3 py-1">
      <h2 className="text-xl font-bold">{initial_data ? "Edit" : "Add"} Income Form</h2>
      {server_errors && <ErrorMessage message={server_errors.message} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
        <Input
          ref={first_input_ref}
          type="text"
          label="Description"
          id="description"
          value={form.description}
          error={error("description")}
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
          error={error("amount")}
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
          id="source_id"
          value={form.source_id}
          error={error("source_id")}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "source_id",
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
          error={error("date")}
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
            label={`${initial_data ? "Update" : "Add"} Income`}
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
