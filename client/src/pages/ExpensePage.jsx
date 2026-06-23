import { useReducer, useState } from "react";
import useToast from "../hooks/useToast";
import useExpenses from "../features/expenses/hooks/useExpenses";
import useExpenseMutations from "../features/expenses/hooks/useExpenseMutations";

import ExpenseFilters from "../features/expenses/components/ExpenseFilters";
import ExpenseList from "../features/expenses/components/ExpenseList";
import ExpenseSummary from "../features/expenses/components/ExpenseSummary";
import ExpenseForm from "../features/expenses/components/ExpenseForm";
import ExpenseSkeleton from "../features/expenses/components/ExpenseSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

const filterInitialState = {
  month: new Date().toISOString().slice(0, 7),
  categoryId: "",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "SET_CATEGORY":
      return { ...state, categoryId: action.payload };
    case "RESET":
      return filterInitialState;
    default:
      return state;
  }
};

const ExpensePage = () => {
  const [filters, dispatch] = useReducer(filterReducer, filterInitialState);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [serverError, setServerError] = useState(null);

  const { data, isLoading, isFetching, isError } = useExpenses(filters);
  const { createExpense, updateExpense, deleteExpense } = useExpenseMutations(filters);

  const { toast, showToast, closeToast } = useToast();

  const handleEdit = (item) => {
    setSelectedExpense(item);
  };

  const handleCancel = () => {
    setSelectedExpense(null);
  };

  const handleDelete = (id) => {
    deleteExpense.mutate(id, {
      onSuccess: () => showToast("Expense deleted", "success"),
      onError: () => showToast("Failed to deleted expense", "error"),
    });
  };

  const handleSubmit = (expense) => {
    setServerError(null);
    if (selectedExpense) {
      updateExpense.mutate(
        { id: selectedExpense.id, data: expense },
        {
          onSuccess: () => {
            showToast("Expense updated", "success");
            setSelectedExpense(null);
          },
          onError: (err) => setServerError(err.message),
        },
      );
    } else {
      createExpense.mutate(expense, {
        onSuccess: () => showToast("Expense added", "success"),
        onError: (err) => setServerError(err.message),
      });
    }
  };

  if (isLoading) return <ExpenseSkeleton />;
  if (isError) return <ErrorMessage message="Failed while fetching data" />;

  return (
    <div className="grid grid-cols-12 justify-center gap-5">
      {isFetching && !isLoading && <Spinner />}
      <div className="col-span-8 flex flex-col justify-start items-start gap-1">
        <ExpenseFilters
          filters={filters}
          dispatch={dispatch}
        />
        <ExpenseList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ExpenseSummary data={data} />
      </div>
      <div className="col-span-4 flex flex-col justify-center items-start gap-1">
        <ExpenseForm
          initialData={selectedExpense}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          serverError={serverError}
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
