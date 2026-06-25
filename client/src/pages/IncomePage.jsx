import { useReducer, useState } from "react";
import useIncomes from "../features/income/hooks/useIncomes";
import useIncomeMutation from "../features/income/hooks/useIncomeMutations";
import useToast from "../hooks/useToast";

import IncomeFilters from "../features/income/components/IncomeFilters";
import IncomeList from "../features/income/components/IncomeList";
import IncomeSummary from "../features/income/components/IncomeSummary";
import IncomeSkeleton from "../features/income/components/IncomeSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

import { getYearMonthDate } from "../utils/date";
import IncomeForm from "../features/income/components/IncomeForm";

const filterInitialState = {
  month: getYearMonthDate(),
  sourceId: "",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "SET_SOURCE":
      return { ...state, sourceId: action.payload };
    case "RESET":
      return filterInitialState;
    default:
      return state;
  }
};

const IncomePage = () => {
  const [filters, dispatch] = useReducer(filterReducer, filterInitialState);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isFetching, isError } = useIncomes(filters);
  const { createIncome, updateIncome, deleteIncome } = useIncomeMutation(filters);

  const { toast, showToast, closeToast } = useToast();

  const handleCancel = () => {
    setIsOpen(false);
    setServerError(null);
    setSelectedIncome(null);
  };

  const handleEdit = (item) => {
    setIsOpen(true);
    setSelectedIncome(item);
  };

  const handleDelete = (id) => {
    deleteIncome.mutate(id, {
      onSuccess: () => {
        setSelectedIncome(null);
        showToast("Income deleted", "success");
      },
      onError: () => showToast("Failed to delete income", "error"),
    });
  };

  const handleSubmit = (data) => {
    if (selectedIncome)
      updateIncome.mutate(
        { id: selectedIncome.id, data },
        {
          onSuccess: () => {
            handleCancel();
            showToast("Income updated", "success");
          },
          onError: (err) => setServerError(err.message),
        },
      );
    else
      createIncome.mutate(data, {
        onSuccess: () => showToast("Income added", "success"),
        onError: (err) => setServerError(err.message),
      });
  };

  if (isLoading) return <IncomeSkeleton />;
  if (isError) return <ErrorMessage message="Failed while fetching data" />;

  return (
    <div className="grid grid-cols-12 justify-center gap-5 overflow-hidden">
      <div className="col-span-8 flex flex-col justify-start items-start gap-1">
        {isFetching && !isLoading && <Spinner />}
        <div className="flex justify-between items-center w-full">
          <IncomeFilters
            filters={filters}
            dispatch={dispatch}
          />
          <Button
            label="Add Income"
            type="button"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <IncomeList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div className="col-span-4 flex flex-col justify-start items-start gap-1 ">
        <IncomeSummary
          data={data}
          filters={filters}
        />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}>
          <IncomeForm
            initialData={selectedIncome}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            serverError={serverError}
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

export default IncomePage;
