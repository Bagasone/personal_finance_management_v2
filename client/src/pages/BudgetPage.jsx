import { useReducer } from "react";

const filterInitialState = {
  month: new Date().toISOString().slice(0, 7),
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
  const [filter, dispatch] = useReducer(filterReducer, filterInitialState);

  return (
    <div>
      <h1>Budget Page</h1>
    </div>
  );
};

export default BudgetPage;
