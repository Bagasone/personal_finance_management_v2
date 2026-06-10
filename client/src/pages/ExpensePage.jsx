import { useReducer, useState } from "react";
import useExpenses from "../features/expenses/hooks/useExpenses";

const filterInitialState = {
  month: new Date().toISOString().slice(0, 7),
  categoryId: null,
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

  const { data } = useExpenses(filters);
  console.log(data);

  return (
    <div className="flex flex-col justify-center gap-3">
      <p>This is the Expense Page</p>
      <button onClick={() => dispatch({ type: "SET_CATEGORY", payload: "cat_food" })}>
        Set category to Food
      </button>
    </div>
  );
};

export default ExpensePage;
