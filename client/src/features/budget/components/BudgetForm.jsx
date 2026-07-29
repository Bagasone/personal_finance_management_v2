import { useEffect } from "react";

import useForm from "../../../hooks/useForm";

import { cn, getMonth, errorField } from "../../../utils";
import { validate } from "../utils/validation";

import { EXPENSE_CATEGORIES } from "../../../constants";
import { MdClose } from "react-icons/md";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import FormError from "../../../components/FormError";

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

  const handleCancel = () => {
    dispatch({ type: "RESET" });
    onCancel();
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-start items-start gap-3",
        "w-11/12 rounded-lg border",
        "shadow-neo-xl border-black-900 shadow-black-900 bg-black-100",
      )}>
      <div className="w-full flex justify-between items-center p-5 border-b-2 border-black-900">
        <h2 className="text-xl font-bold">{initial_data ? "Edit" : "Add"} Budget</h2>
        <Button
          type="button"
          aria-label="Cancel form"
          cls="p-1 rounded-lg"
          onClick={handleCancel}>
          <MdClose className="size-5" />
        </Button>
      </div>
      <FormError message={server_errors?.message} />
      <form
        onSubmit={handleSubmit}
        className="px-5 pb-10 pt-5 rounded-sm flex flex-col gap-3 w-full h-full">
        <FormField
          label="Category"
          id="category_id"
          error={error("category_id")}>
          <Select
            id="category_id"
            value={form.category_id}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "category_id",
                payload: e.target.value,
              })
            }
            cls="px-3 py-1 rounded-md border shadow-neo-md border-black-900 shadow-black-900"
            options={EXPENSE_CATEGORIES}>
            <Option
              label="Select Category"
              value=""
            />
          </Select>
        </FormField>

        <FormField
          label="Limit"
          id="limit"
          error={error("limit")}>
          <Input
            type="number"
            id="limit"
            value={form.limit}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "limit",
                payload: e.target.value,
              })
            }
            cls="px-3 py-1 rounded-md border shadow-neo-md border-black-900 shadow-black-900"
          />
        </FormField>

        <FormField
          label="Month"
          id="month"
          error={error("month")}>
          <Input
            type="month"
            id="month"
            value={form.month}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "month",
                payload: e.target.value,
              })
            }
            cls="px-3 py-1 rounded-md border shadow-neo-md border-black-900 shadow-black-900"
          />
        </FormField>

        <Button
          type="submit"
          cls="text-base bg-budget-500 text-black-200"
          label={`${initial_data ? "Update" : "Add"} Budget`}
        />
      </form>
    </div>
  );
};

export default BudgetForm;
