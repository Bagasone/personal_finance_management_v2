import { useReducer } from "react";

const useForm = (initialFields) => {
  const initialState = { ...initialFields, errors: {} };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.payload };
      case "INVALID":
        return { ...state, errors: action.payload };
      case "RESET":
        return initialState;
      case "PREFILL": {
        const { errors, ...fields } = initialState;
        const filled = Object.keys(fields).reduce(
          (acc, key) => ({ ...acc, [key]: action.payload[key] ?? fields[key] }),
          {},
        );
        return { ...filled, errors: {} };
      }
      default:
        return state;
    }
  };

  return useReducer(reducer, initialState);
};

export default useForm;
