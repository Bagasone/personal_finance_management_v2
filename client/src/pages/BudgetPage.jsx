import { useReducer, useState } from "react";

import useToast from "../hooks/useToast";
import useBudgets from "../features/budget/hooks/useBudgets";
import useBudgetMutations from "../features/budget/hooks/useBudgetMutations";
import useExpenses from "../features/expenses/hooks/useExpenses";

import { getMonth, calculate, labelCategory } from "../utils";

import { TbPlus } from "react-icons/tb";

import BudgetFilters from "../features/budget/components/BudgetFilters";
import BudgetList from "../features/budget/components/BudgetList";
import BudgetSummary from "../features/budget/components/BudgetSummary";
import BudgetForm from "../features/budget/components/BudgetForm";
import BudgetSkeleton from "../features/budget/components/BudgetSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import ToastContainer from "../components/ToastContainer";
import Modal from "../components/Modal";
import FAB from "../components/FAB";

const initial_state = {
  month: getMonth(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "RESET":
      return initial_state;
    default:
      return state;
  }
};

const BudgetPage = () => {
  const [filters, dispatch] = useReducer(reducer, initial_state);
  const [edited, setEdited] = useState(null);
  const [is_open, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({ message: null, fields: {} });

  const { toasts, showToast, closeToast } = useToast();

  const {
    data: budgets,
    isLoading: isBudgetLoading,
    isFetching: isBudgetFetching,
    isError: isBudgetError,
    error: budgetError,
    refetch: budgetRefetch,
  } = useBudgets(filters);

  const {
    data: expenses,
    isLoading: isExpenseLoading,
    isFetching: isExpenseFetching,
    isError: isExpenseError,
    error: expenseError,
    refetch: expenseRefetch,
  } = useExpenses(filters);

  const isLoading = isBudgetLoading || isExpenseLoading;
  const isFetching = isBudgetFetching || isExpenseFetching;
  const isError = isBudgetError || isExpenseError;
  const error = budgetError || expenseError;
  const refetch = () => {
    budgetRefetch();
    expenseRefetch();
  };

  const { createBudget, updateBudget, deleteBudget } = useBudgetMutations(filters);

  if (isLoading) return <BudgetSkeleton />;
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
    deleteBudget.mutate(id, {
      onSuccess: () => {
        showToast("Budget deleted", "success");
      },
      onError: () => {
        showToast("Failed to delete budget", "error");
      },
    });
  };

  const handleSubmit = (data) => {
    setErrors({ message: null, fields: {} });
    if (edited)
      updateBudget.mutate(
        { id: edited.id, data },
        {
          onSuccess: () => {
            showToast("Budget updated", "success");
            handleCancel();
          },
          onError: (err) => {
            setErrors({ message: err.message, fields: err.errors });
          },
        },
      );
    else
      createBudget.mutate(data, {
        onSuccess: () => {
          showToast("Budget added", "success");
          handleCancel();
        },
        onError: (err) => {
          setErrors({ message: err.message, fields: err.errors });
        },
      });
  };

  return (
    <div className="flex flex-col justify-center gap-5 pb-20">
      <h1 className="sr-only">Budgets</h1>
      <div className="relative">
        {isFetching && !isLoading && <Spinner />}
        <BudgetSummary
          data={budgets}
          data_expenses={expenses}
          month={filters.month}
        />
      </div>
      <BudgetFilters
        filters={filters}
        dispatch={dispatch}
      />
      <BudgetList
        data={budgets}
        data_expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpen={() => setIsOpen(true)}
      />
      <Modal
        is_open={is_open}
        onClose={handleCancel}>
        <BudgetForm
          initial_data={edited}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          server_errors={errors}
        />
      </Modal>
      <FAB
        cls="bg-budget-500"
        onClick={() => setIsOpen(true)}>
        <TbPlus className="size-10 text-black-200" />
      </FAB>
      <ToastContainer
        toasts={toasts}
        onClose={closeToast}
      />
    </div>
  );
};

export default BudgetPage;
