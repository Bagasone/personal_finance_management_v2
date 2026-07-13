import { useEffect } from "react";

import useForm from "../../../hooks/useForm";

import { EXPENSE_CATEGORIES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { validate } from "../utils/validation";
import { getDate } from "../../../utils/date";
import { errorField } from "../../../utils/error";

const ExpenseForm = ({ initial_data, onSubmit, onCancel, server_errors, ref }) => {
  const [form, dispatch] = useForm({
    description: "",
    amount: "",
    category_id: "",
    date: getDate(),
  });

  const error = errorField(form?.errors, server_errors?.fields);

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
      onSubmit(data, () => dispatch({ type: "RESET" }));
    } else dispatch({ type: "INVALID", payload: errors });
  };

  return (
    <div className="flex flex-col justify-start items-start gap-3 w-full">
      <h2 className="text-xl font-bold">{initial_data ? "Edit" : "Add"} Expense Form</h2>
      {server_errors && <ErrorMessage message={server_errors.message} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
        <Input
          ref={ref}
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
          label="Category"
          id="category_id"
          value={form.category_id}
          error={error("category_id")}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "category_id",
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
        <Button
          type="submit"
          label={`${initial_data ? "Update" : "Add"} Expense`}
        />
        {initial_data && (
          <Button
            type="button"
            label="Cancel"
            onClick={onCancel}
          />
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
