import { useEffect, forwardRef } from "react";

import useForm from "../../../hooks/useForm";

import { EXPENSE_CATEGORIES } from "../../../constants";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { validate } from "../utils/validation";
import { getShortDate } from "../../../utils/date";
import { errorField } from "../../../utils/errors";

const ExpenseForm = forwardRef(
  ({ initialData, onSubmit, onCancel, serverErrors }, ref) => {
    const [form, dispatch] = useForm({
      description: "",
      amount: "",
      categoryId: "",
      date: getShortDate(),
    });

    const fieldError = errorField(form?.errors, serverErrors?.fields);

    useEffect(() => {
      if (initialData) dispatch({ type: "PREFILL", payload: initialData });
      else dispatch({ type: "RESET" });
    }, [initialData]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const { valid, errors } = validate(form);
      if (valid) {
        const { errors, ...formData } = form;
        onSubmit(formData, () => dispatch({ type: "RESET" }));
      } else dispatch({ type: "INVALID", payload: errors });
    };

    return (
      <div className="flex flex-col justify-start items-start gap-3 w-full">
        <h2 className="text-xl font-bold">{initialData ? "Edit" : "Add"} Expense Form</h2>
        {serverErrors && <ErrorMessage message={serverErrors.message} />}
        <form
          onSubmit={handleSubmit}
          className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
          <Input
            ref={ref}
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
            label="Category"
            id="categoryId"
            value={form.categoryId}
            error={fieldError("categoryId")}
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
          <Button
            type="submit"
            label={`${initialData ? "Update" : "Add"} Expense`}
          />
          {initialData && (
            <Button
              type="button"
              label="Cancel"
              onClick={onCancel}
            />
          )}
        </form>
      </div>
    );
  },
);

export default ExpenseForm;
