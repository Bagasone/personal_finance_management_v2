import { useEffect, useReducer, useState } from "react";

import useToast from "../hooks/useToast";
import useBudgets from "../features/budget/hooks/useBudgets";
import useBudgetMutations from "../features/budget/hooks/useBudgetMutations";
import useExpenses from "../features/expenses/hooks/useExpenses";

import { getMonth, calculate, labelCategory } from "../utils";

import BudgetFilters from "../features/budget/components/BudgetFilters";
import BudgetList from "../features/budget/components/BudgetList";
import BudgetSummary from "../features/budget/components/BudgetSummary";
import BudgetForm from "../features/budget/components/BudgetForm";
import BudgetDetailPanel from "../features/budget/components/BudgetDetailPanel";
import BudgetSkeleton from "../features/budget/components/BudgetSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

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
  const [selected, setSelected] = useState(null);
  const [edited, setEdited] = useState(null);
  const [is_open, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({ message: null, fields: {} });

  const { toast, showToast, closeToast } = useToast();

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
  const refetch = budgetRefetch || expenseRefetch;

  const { createBudget, updateBudget, deleteBudget } = useBudgetMutations(filters);

  useEffect(() => {
    setSelected(null);
  }, [filters.month]);

  if (isLoading) return <BudgetSkeleton />;
  if (isError && error.status >= 500)
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
      />
    );

  const handleSelected = (data) => {
    setSelected(data);
  };

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
        if (selected.id === id) setSelected(null);
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
    <div className="grid grid-cols-12 justify-center gap-5 overflow-hidden">
      <div className="col-span-8 flex flex-col justify-start items-start gap-1">
        {isFetching && !isLoading && <Spinner />}
        <div className="flex justify-between items-center w-full">
          <BudgetFilters
            filters={filters}
            dispatch={dispatch}
          />
          <Button
            label="Add Budget"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <BudgetList
          data={budgets}
          data_expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleSelected}
          onOpen={() => setIsOpen(true)}
        />
        <BudgetSummary data={budgets} />
      </div>
      <div className="col-span-4 flex flex-col justify-start items-start gap-1 ">
        <BudgetDetailPanel
          data={selected}
          data_expenses={expenses}
        />
      </div>
      {is_open && (
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
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default BudgetPage;
