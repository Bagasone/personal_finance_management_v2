import { useReducer } from "react";
import useBudgets from "../features/budget/hooks/useBudgets";

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
  const [filters, dispatch] = useReducer(filterReducer, filterInitialState);
  const { data } = useBudgets(filters);
  console.log(data);

  return (
    <div>
      <p>This is the Budget Page</p>
    </div>
  );
};

export default BudgetPage;
