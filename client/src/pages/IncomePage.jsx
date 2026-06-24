import { useReducer, useState } from "react";
import useIncomes from "../features/income/hooks/useIncomes";
import useIncomeMutation from "../features/income/hooks/useIncomeMutations";
import useToast from "../hooks/useToast";

import IncomeFilters from "../features/income/components/IncomeFilters";
import IncomeList from "../features/income/components/IncomeList";
import IncomeSummary from "../features/income/components/IncomeSummary";
import IncomeSkeleton from "../features/income/components/IncomeSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

import { getYearMonthDate } from "../utils/date";

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

  const { data, isLoading, isFetching, isError } = useIncomes(filters);
  const { createIncome, updateIncome, deleteIncome } = useIncomeMutation(filters);

  const { toast, showToast, closeToast } = useToast();

  const handleEdit = (item) => {
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

  if (isLoading) return <IncomeSkeleton />;
  if (isError) return <ErrorMessage message="Failed while fetching data" />;

  return (
    <div className="grid grid-cols-12 justify-center gap-5 overflow-hidden">
    <div className="col-span-8 flex flex-col justify-start items-start gap-1">
        {isFetching && !isLoading && <Spinner />}
        <IncomeFilters
          filters={filters}
          dispatch={dispatch}
        />
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
