import { useReducer, useState } from "react";

import useToast from "../hooks/useToast";
import useBudgets from "../features/budget/hooks/useBudgets";
import useBudgetMutations from "../features/budget/hooks/useBudgetMutations";
import useExpenses from "../features/expenses/hooks/useExpenses";

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

import { getMonth } from "../utils/date";
import { calculate } from "../utils/calculate";
import { labelCategory } from "../utils/label";

const initialState = {
  month: getMonth(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const BudgetPage = () => {
  const [filters, dispatch] = useReducer(reducer, initialState);
  const [selected, setSelected] = useState(null);
  const [edited, setEdited] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSelected = (data) => {
    const label = labelCategory(data.id);
    const spent = calculate(expenses, "amount", {
      key: "categoryId",
      value: data.categoryId,
    });
    const remaining = data.limit - spent;
    const quantity = expenses.map((e) => e.categoryId === data.id).length;
    const average = spent / quantity;
    const expense = expenses.filter((e) => e.categoryId === data.categoryId);

    setSelected({
      ...data,
      label,
      spent,
      remaining,
      quantity,
      average,
      expenses: expense,
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    setEdited(null);
    setErrors({ message: null, fields: {} });
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

  const handleEdit = (data) => {
    setIsOpen(true);
    setEdited(data);
  };

  const handleSubmit = (data) => {
    setErrors({ message: null, fields: {} });
    if (selected)
      updateBudget.mutate(
        { id: selected.id, data },
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

  if (isLoading) return <BudgetSkeleton />;
  if (isError && error.status >= 500)
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
      />
    );

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
          dataBudgets={budgets}
          dataExpenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleSelected}
        />
        <BudgetSummary data={budgets} />
      </div>
      <div className="col-span-4 flex flex-col justify-start items-start gap-1 ">
        <BudgetDetailPanel data={selected} />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}>
          <BudgetForm
            initialData={edited}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            serverErrors={errors}
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
