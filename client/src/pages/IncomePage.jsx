import { useReducer, useState } from "react";

import useIncomes from "../features/income/hooks/useIncomes";
import useIncomeMutation from "../features/income/hooks/useIncomeMutations";
import useToast from "../hooks/useToast";

import { getMonth } from "../utils/date";

import IncomeFilters from "../features/income/components/IncomeFilters";
import IncomeList from "../features/income/components/IncomeList";
import IncomeSummary from "../features/income/components/IncomeSummary";
import IncomeForm from "../features/income/components/IncomeForm";
import IncomeSkeleton from "../features/income/components/IncomeSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const initialState = {
  month: getMonth(),
  sourceId: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "SET_SOURCE":
      return { ...state, sourceId: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const IncomePage = () => {
  const [filters, dispatch] = useReducer(reducer, initialState);
  const [edited, setEdited] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({ message: null, fields: {} });

  const { data, isLoading, isFetching, isError, error, refetch } = useIncomes(filters);
  const { createIncome, updateIncome, deleteIncome } = useIncomeMutation(filters);

  const { toast, showToast, closeToast } = useToast();

  if (isLoading) return <IncomeSkeleton />;
  if (isError && error.status >= 500)
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
      />
    );

  const handleCancel = () => {
    setIsOpen(false);
    setEdited(null);
    setErrors({ message: null, fields: {} });
  };

  const handleEdit = (item) => {
    setIsOpen(true);
    setEdited(item);
  };

  const handleDelete = (id) => {
    deleteIncome.mutate(id, {
      onSuccess: () => {
        showToast("Income deleted", "success");
        setEdited(null);
      },
      onError: () => {
        showToast("Failed to delete income", "error");
      },
    });
  };

  const handleSubmit = (data) => {
    setErrors({ message: null, fields: {} });
    if (edited)
      updateIncome.mutate(
        { id: edited.id, data },
        {
          onSuccess: () => {
            showToast("Income updated", "success");
            handleCancel();
          },
          onError: (err) => {
            setErrors({ message: err.message, fields: err.errors });
          },
        },
      );
    else
      createIncome.mutate(data, {
        onSuccess: () => {
          showToast("Income added", "success");
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
          onOpen={() => setIsOpen(true)}
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

export default IncomePage;
