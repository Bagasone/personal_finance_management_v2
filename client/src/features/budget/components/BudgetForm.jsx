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
import { errorField } from "../../../utils/errors";

const BudgetForm = ({ initialData, onSubmit, onCancel, serverErrors }) => {
  const [form, dispatch] = useForm({
    categoryId: "",
    limit: "",
    month: getMonth(),
    prevCategoryId: "",
    prevMonth: "",
  });

  const fieldError = errorField(form?.errors, serverErrors?.fields);

  useEffect(() => {
    if (initialData)
      dispatch({
        type: "PREFILL",
        payload: {
          ...initialData,
          prevCategoryId: initialData.categoryId,
          prevMonth: initialData.month,
        },
      });
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
    <div className="flex flex-col justify-start items-start gap-3 w-full">
      <h2 className="text-xl font-bold">{initialData ? "Edit" : "Add"} Budget Form</h2>
      {serverErrors && <ErrorMessage message={serverErrors.message} />}
      <form
        onSubmit={handleSubmit}
        className="border px-3 py-1 rounded-sm flex flex-col gap-3 w-full h-full">
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
          type="number"
          label="Limit"
          id="limit"
          value={form.limit}
          error={fieldError("limit")}
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
          error={fieldError("month")}
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
