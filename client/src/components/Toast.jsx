import { cn } from "../utils";

const Toast = ({ message, type = "success", onClose }) => {
  return (
    <div
      className={cn(
        "absolute top-safe-area right-safe-area z-50",
        "flex justify-center items-center gap-1",
        "rounded-lg border-2 px-3 py-1",
        "text-sm font-semibold",
        "text-black-100 shadow-neo-md shadow-black-900 border-black-900",
        type === "success" ? "bg-emerald-500" : "bg-rose-500",
      )}>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Toast;
