import { useEffect } from "react";

import useForm from "../../../hooks/useForm";

import { EXPENSE_CATEGORIES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { validate } from "../utils/validation";
import { getMonth } from "../../../utils/date";
import { errorField } from "../../../utils/error";

const BudgetForm = ({ initial_data, onSubmit, onCancel, server_errors }) => {
  const [form, dispatch] = useForm({
    category_id: "",
    limit: "",
    month: getMonth(),
    prev_category_id: "",
    prev_month: "",
  });

  const error = errorField(form?.errors, server_errors?.fields);

  useEffect(() => {
    if (initial_data)
      dispatch({
        type: "PREFILL",
        payload: {
          ...initial_data,
          prev_category_id: initial_data.category_id,
          prev_month: initial_data.month,
        },
      });
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
    <div className="flex flex-col justify-start items-start gap-3 w-full">
      <h2 className="text-xl font-bold">{initial_data ? "Edit" : "Add"} Budget Form</h2>
      {server_errors && <ErrorMessage message={server_errors.message} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
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
          type="number"
          label="Limit"
          id="limit"
          value={form.limit}
          error={error("limit")}
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
          error={error("month")}
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
          label={`${initial_data ? "Update" : "Add"} Budget`}
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
