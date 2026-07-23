import { cn } from "../utils";

const Button = ({ label, type = "button", onClick, cls, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "flex justify-center items-center gap-1",
        "text-sm font-medium",
        "rounded-md border-2 px-3 py-1",
        "border-black-900 neo-shadow-md shadow-black-900",
        cls,
      )}>
      {children}
      {label}
    </button>
  );
};

export default Button;
