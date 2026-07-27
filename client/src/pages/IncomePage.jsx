import { useReducer, useState } from "react";

import useIncomes from "../features/income/hooks/useIncomes";
import useIncomeMutation from "../features/income/hooks/useIncomeMutations";
import useToast from "../hooks/useToast";

import { getMonth, prevMonth } from "../utils";

import { TbPlus } from "react-icons/tb";

import IncomeFilters from "../features/income/components/IncomeFilters";
import IncomeList from "../features/income/components/IncomeList";
import IncomeSummary from "../features/income/components/IncomeSummary";
import IncomeForm from "../features/income/components/IncomeForm";
import IncomeSkeleton from "../features/income/components/IncomeSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import ToastContainer from "../components/ToastContainer";
import Modal from "../components/Modal";
import FAB from "../components/FAB";
import IncomeSourceBreakdown from "../features/income/components/IncomeSourceBreakdown";

const initial_state = {
  month: getMonth(),
  source_id: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "SET_SOURCE":
      return { ...state, source_id: action.payload };
    case "RESET":
      return initial_state;
    default:
      return state;
  }
};

const IncomePage = () => {
  const [filters, dispatch] = useReducer(reducer, initial_state);
  const [edited, setEdited] = useState(null);
  const [is_open, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({ message: null, fields: {} });

  const prev_month = prevMonth(filters.month);

  const {
    data,
    isLoading: is_current_loading,
    isFetching,
    isError: is_current_error,
    error: current_error,
    refetch,
  } = useIncomes(filters);

  const {
    data: prev_data,
    isLoading: is_prev_loading,
    isError: is_prev_error,
    error: prev_error,
  } = useIncomes({ ...filters, month: prev_month });

  const { createIncome, updateIncome, deleteIncome } = useIncomeMutation(filters);
  const { toasts, showToast, closeToast } = useToast();

  const isLoading = is_current_loading || is_prev_loading;
  const isError = is_current_error || is_prev_error;
  const error = current_error ?? prev_error;

  if (isLoading) return <IncomeSkeleton />;
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
    deleteIncome.mutate(id, {
      onSuccess: () => {
        showToast("Income deleted", "success");
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
    <div className="flex flex-col justify-center gap-5 pb-20">
      <h1 className="sr-only">Incomes</h1>
      <div className="relative">
        {isFetching && !isLoading && (
          <Spinner cls="absolute bottom-2 right-2 text-black-200" />
        )}
        <IncomeSummary
          data={data}
          prev_data={prev_data}
          filters={filters}
        />
      </div>
      <IncomeSourceBreakdown data={data} />
      <IncomeFilters
        filters={filters}
        dispatch={dispatch}
      />
      <IncomeList
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpen={() => setIsOpen(true)}
      />
      <Modal
        is_open={is_open}
        onClose={handleCancel}>
        <IncomeForm
          initial_data={edited}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          server_errors={errors}
        />
      </Modal>
      <FAB
        cls="bg-income-500"
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

export default IncomePage;
