import { useReducer } from "react";

const useForm = (initial_fields) => {
  const initial_state = { ...initial_fields, errors: {} };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.payload };
      case "INVALID":
        return { ...state, errors: action.payload };
      case "RESET_ERROR":
        return { ...state, errors: {} };
      case "RESET":
        return initial_state;
      case "PREFILL": {
        const { errors, ...fields } = initial_state;
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

  return useReducer(reducer, initial_state);
};

export default useForm;
