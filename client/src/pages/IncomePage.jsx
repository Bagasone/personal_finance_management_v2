import { useReducer } from "react";

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

const IncomePage = () => {
  const [filter, dispatch] = useReducer(filterReducer, filterInitialState);

  return (
    <div>
      <h1>Income Page</h1>
    </div>
  );
};

export default IncomePage;
