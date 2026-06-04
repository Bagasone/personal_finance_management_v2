import { useReducer } from "react";
import useIncomes from "../features/income/hooks/useIncomes";

const filterInitialState = {
  month: new Date().toISOString().slice(0, 7),
  source: null,
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_MONTH":
      return { ...state, month: action.payload };
    case "SET_SOURCE":
      return { ...state, source: action.payload };
    case "RESET":
      return filterInitialState;
    default:
      return state;
  }
};

const IncomePage = () => {
  const [filters, dispatch] = useReducer(filterReducer, filterInitialState);
  const { data } = useIncomes(filters);
  console.log(data);

  return (
    <div>
      <h1>Income Page</h1>
      <button onClick={() => dispatch({ type: "SET_SOURCE", payload: "freelance" })}>
        Set Source to Freelance
      </button>
    </div>
  );
};

export default IncomePage;
