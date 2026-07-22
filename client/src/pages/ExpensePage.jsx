import { useReducer, useState } from "react";

import useExpenses from "../features/expenses/hooks/useExpenses";
import useExpenseMutations from "../features/expenses/hooks/useExpenseMutations";
import useToast from "../hooks/useToast";

import { cn, getMonth, prevMonth } from "../utils";

import ExpenseFilters from "../features/expenses/components/ExpenseFilters";
import ExpenseList from "../features/expenses/components/ExpenseList";
import ExpenseSummary from "../features/expenses/components/ExpenseSummary";
import ExpenseForm from "../features/expenses/components/ExpenseForm";
import ExpenseSkeleton from "../features/expenses/components/ExpenseSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import Modal from "../components/Modal";

const initial_state = {
  month: getMonth(),
  category_id: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "SET_CATEGORY":
      return { ...state, category_id: action.payload };
    case "RESET":
      return initial_state;
    default:
      return state;
  }
};

const ExpensePage = () => {
  const [filters, dispatch] = useReducer(reducer, initial_state);
  const [edited, setEdited] = useState(null);
  const [errors, setErrors] = useState({ message: null, fields: {} });
  const [is_open, setIsOpen] = useState(false);

  const prev_month = prevMonth(filters.month);

  const { data, isLoading, isFetching, isError, error, refetch } = useExpenses(filters);
  const { data: prev_data } = useExpenses({ ...filters, month: prev_month });
  const { createExpense, updateExpense, deleteExpense } = useExpenseMutations(filters);

  const { toast, showToast, closeToast } = useToast();

  if (isLoading) return <ExpenseSkeleton />;
  if (isError && error.status >= 500)
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
      />
    );

  const handleCancel = () => {
    setErrors({ message: null, fields: {} });
    setEdited(null);
    setIsOpen(false);
  };

  const handleEdit = (data) => {
    setEdited(data);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    deleteExpense.mutate(id, {
      onSuccess: () => {
        showToast("Expense deleted", "success");
      },
      onError: () => {
        showToast("Failed to delete expense", "error");
      },
    });
  };

  const handleSubmit = (data) => {
    setErrors({ message: null, fields: {} });
    if (edited)
      updateExpense.mutate(
        { id: edited.id, data },
        {
          onSuccess: () => {
            showToast("Expense updated", "success");
            handleCancel();
          },
          onError: (err) => {
            setErrors({ message: err.message, fields: err.errors });
          },
        },
      );
    else
      createExpense.mutate(data, {
        onSuccess: () => {
          showToast("Expense added", "success");
          handleCancel();
        },
        onError: (err) => {
          setErrors({ message: err.message, fields: err.errors });
        },
      });
  };

  return (
    <div className="flex flex-col justify-center gap-10">
      <h1 className="sr-only">Expenses</h1>
      <div className="relative">
        {isFetching && !isLoading && <Spinner cls="text-black-200 size-5" />}
        <ExpenseSummary
          data={data}
          prev_data={prev_data}
          category_id={filters.category_id}
          month={filters.month}
        />
      </div>
      <ExpenseFilters
        filters={filters}
        dispatch={dispatch}
      />
      <ExpenseList
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpen={() => setIsOpen(true)}
      />
      <Modal
        is_open={is_open}
        onClose={handleCancel}>
        <ExpenseForm
          initial_data={edited}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          server_errors={errors}
        />
      </Modal>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default ExpensePage;
