import { cn } from "../utils";

const Input = ({ type = "text", id, value, onChange, cls, ...props }) => {
  return (
    <input
      type={type}
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      className={cn("w-full", cls)}
      {...props}
    />
  );
};

export default Input;
