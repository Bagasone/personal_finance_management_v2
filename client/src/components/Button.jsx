import { cn } from "../utils";

const Button = ({ label, type = "button", onClick, cls, children, ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "flex justify-center items-center gap-1",
        "text-sm font-medium",
        "rounded-md border-2 px-3 py-1",
        "border-black-900 shadow-neo-md shadow-black-900",
        cls,
      )}
      {...props}>
      {children}
      {label}
    </button>
  );
};

export default Button;
