import { useReducer, useState } from "react";
import useToast from "../hooks/useToast";
import useBudgets from "../features/budget/hooks/useBudgets";
import useBudgetMutations from "../features/budget/hooks/useBudgetMutations";
import useExpenses from "../features/expenses/hooks/useExpenses";

import BudgetFilters from "../features/budget/components/BudgetFilters";
import BudgetList from "../features/budget/components/BudgetList";
import BudgetSummary from "../features/budget/components/BudgetSummary";
import BudgetSkeleton from "../features/budget/components/BudgetSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

import { getYearMonthDate } from "../utils/date";

const filterInitialState = {
  month: getYearMonthDate(),
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "RESET":
      return filterInitialState;
    default:
      return state;
  }
};

const BudgetPage = () => {
  const [filters, dispatch] = useReducer(filterReducer, filterInitialState);
  const [selectedBuget, setSelectedBuget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { toast, showToast, closeToast } = useToast();

  const {
    data: budgets,
    isLoading: isBudgetLoading,
    isFetching: isBudgetFetching,
    isError: isBudgetError,
  } = useBudgets(filters);

  const {
    data: expenses,
    isLoading: isExpenseLoading,
    isFetching: isExpenseFetching,
    isError: isExpenseError,
  } = useExpenses(filters);

  const isLoading = isBudgetLoading || isExpenseLoading;
  const isFetching = isBudgetFetching || isExpenseFetching;
  const isError = isBudgetError || isExpenseError;

  const { createBudget, updateBudget, deleteBudget } = useBudgetMutations(filters);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    deleteBudget.mutate(id, {
      onSuccess: () => showToast("Budget deleted", "success"),
      onError: () => showToast("Failed to delete budget", "error"),
    });
  };

  const handleEdit = (item) => {
    setIsOpen(true);
    setSelectedBuget(item);
  };

  if (isLoading) return <BudgetSkeleton />;
  if (isError) return <ErrorMessage message="Failed while fetching data" />;

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
        />
        <BudgetSummary data={budgets} />
      </div>
      <div className="col-span-4 flex flex-col justify-start items-start gap-1 "></div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}>
          Budget Form
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
