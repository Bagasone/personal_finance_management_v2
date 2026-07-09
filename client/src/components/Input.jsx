import { forwardRef } from "react";

const Input = forwardRef(({ type = "text", label, id, value, onChange, error }, ref) => {
  return (
    <div className="flex flex-col text-sm">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        ref={ref}
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className="box w-full text-sm cursor-pointer"
      />
      {error && <p className="text-rose-500 first-letter:capitalize">{error}</p>}
    </div>
  );
});

export default Input;
