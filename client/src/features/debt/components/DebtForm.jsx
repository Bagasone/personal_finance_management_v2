import { useEffect } from "react";

import useForm from "../../../hooks/useForm";

import { validate } from "../utils/validation";
import { errorField } from "../../../utils/error";

import { DEBT_TYPES } from "../../../constants/";
import { MdClose } from "react-icons/md";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import FormError from "../../../components/FormError";

const DebtForm = ({ initial_data, onSubmit, onCancel, server_errors }) => {
  const [form, dispatch] = useForm({
    type: "owe",
    description: "",
    total_amount: "",
    due_date: "",
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
      onSubmit(data);
    } else dispatch({ type: "INVALID", payload: errors });
  };

  const handleCancel = () => {
    dispatch({ type: "RESET" });
    onCancel();
  };

  return (
    <div className="flex flex-col justify-start items-start gap-3 w-full">
      <div className="w-full flex justify-between items-center p-5 border-b-2">
        <h2 className="text-xl font-bold">{initial_data ? "Edit" : "Add"} Debt</h2>
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
          label="Type"
          id="type"
          error={error("type")}>
          <fieldset className="flex justify-between items-center">
            <div className="flex flex-col text-sm">
              <label htmlFor="type-owe">I Owe</label>
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
              <label htmlFor="type-owed">Owed to Me</label>
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
        </FormField>

        <FormField
          label="Description"
          id="description"
          error={error("description")}>
          <Input
            id="description"
            value={form.description}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "description", payload: e.target.value })
            }
            cls="px-3 py-1 rounded-md border shadow-neo-md border-black-900 shadow-black-900"
          />
        </FormField>

        <FormField
          label="Total Amount"
          id="total_amount"
          error={error("total_amount")}>
          <Input
            type="number"
            id="total_amount"
            value={form.total_amount}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "total_amount",
                payload: e.target.value,
              })
            }
            cls="px-3 py-1 rounded-md border shadow-neo-md border-black-900 shadow-black-900"
          />
        </FormField>

        <FormField
          label="Due Date"
          id="due_date"
          error={error("due_date")}>
          <Input
            type="date"
            id="due_date"
            value={form.due_date}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "due_date", payload: e.target.value })
            }
            cls="px-3 py-1 rounded-md border shadow-neo-md border-black-900 shadow-black-900"
          />
        </FormField>

        <Button
          type="submit"
          cls="text-base bg-debt-500 text-black-200"
          label={`${initial_data ? "Update" : "Add"} Debt`}
        />
      </form>
    </div>
  );
};

export default DebtForm;
