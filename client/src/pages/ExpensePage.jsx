import { useReducer, useState, useRef, useEffect } from "react";

import useToast from "../hooks/useToast";
import useExpenses from "../features/expenses/hooks/useExpenses";
import useExpenseMutations from "../features/expenses/hooks/useExpenseMutations";

import { getMonth } from "../utils/date";

import ExpenseFilters from "../features/expenses/components/ExpenseFilters";
import ExpenseList from "../features/expenses/components/ExpenseList";
import ExpenseSummary from "../features/expenses/components/ExpenseSummary";
import ExpenseForm from "../features/expenses/components/ExpenseForm";
import ExpenseSkeleton from "../features/expenses/components/ExpenseSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

const initialState = {
  month: getMonth(),
  categoryId: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "SET_CATEGORY":
      return { ...state, categoryId: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const ExpensePage = () => {
  const [filters, dispatch] = useReducer(reducer, initialState);
  const [edited, setEdited] = useState(null);
  const [errors, setErrors] = useState({ message: null, fields: {} });

  const firstInputRef = useRef(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useExpenses(filters);
  const { createExpense, updateExpense, deleteExpense } = useExpenseMutations(filters);
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    setEdited(null);
  }, [filters.month]);

  if (isLoading) return <ExpenseSkeleton />;
  if (isError && error.status >= 500)
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
      />
    );

  const handleEdit = (data) => {
    setErrors({ message: null, fields: {} });
    setEdited(data);
  };

  const handleCancel = () => {
    setEdited(null);
    setErrors({ message: null, fields: {} });
  };

  const handleDelete = (id) => {
    deleteExpense.mutate(id, {
      onSuccess: () => {
        if (edited.id === id) {
          setEdited(null);
          setErrors({ message: null, fields: {} });
        }
        showToast("Expense deleted", "success");
      },
      onError: () => {
        showToast("Failed to delete expense", "error");
      },
    });
  };

  const handleSubmit = (data, resetForm) => {
    setErrors({ message: null, fields: {} });
    if (edited)
      updateExpense.mutate(
        { id: edited.id, data },
        {
          onSuccess: () => {
            showToast("Expense updated", "success");
            setEdited(null);
            resetForm();
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
          resetForm();
        },
        onError: (err) => {
          setErrors({ message: err.message, fields: err.errors });
        },
      });
  };

  return (
    <div className="grid grid-cols-12 justify-center gap-5">
      {isFetching && !isLoading && <Spinner />}
      <div className="col-span-8 flex flex-col justify-start items-start gap-1 max-h-[80%]">
        <ExpenseFilters
          filters={filters}
          dispatch={dispatch}
        />
        <ExpenseList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onFocus={() => firstInputRef.current?.focus()}
        />
        <ExpenseSummary
          data={data}
          categoryId={filters.categoryId}
        />
      </div>
      <div className="col-span-4 flex flex-col items-start gap-1">
        <ExpenseForm
          initialData={edited}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          serverErrors={errors}
          ref={firstInputRef}
        />
      </div>
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
