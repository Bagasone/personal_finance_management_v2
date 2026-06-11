import { useReducer, useState } from "react";
import useExpenses from "../features/expenses/hooks/useExpenses";
import useExpenseMutations from "../features/expenses/hooks/useExpenseMutations";

import ExpenseFilters from "../features/expenses/components/ExpenseFilters";
import ExpenseList from "../features/expenses/components/ExpenseList";

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

  const { data } = useExpenses(filters);
  const { createExpense, updateExpense, deleteExpense } = useExpenseMutations(filters);

  const handleEdit = (item) => {
    setSelectedExpense(item);
  };

  const handleDelete = (id) => {
    deleteExpense.mutate(id);
  };

  return (
    <div className="grid grid-cols-12 justify-center gap-3">
      <div className="col-span-8 flex flex-col justify-center items-start gap-1">
        <ExpenseFilters
          filters={filters}
          dispatch={dispatch}
        />
        <ExpenseList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div className="col-span-4 flex flex-col justify-center items-start gap-1">
        Expense Form
      </div>
    </div>
  );
};

export default ExpensePage;
