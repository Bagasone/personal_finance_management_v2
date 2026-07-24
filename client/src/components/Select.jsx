import { cn } from "../utils";

import Option from "./Option";

const Select = ({ id, value, onChange, options, cls, children }) => {
  return (
    <select
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      className={cn("w-full", cls)}>
      {children}
      {options.map((opt) => (
        <Option
          key={opt.id}
          value={opt.id}
          label={opt.label}
        />
      ))}
    </select>
  );
};

export default Select;
