import { cn } from "../utils";
import { MdCheck, MdError, MdClose } from "react-icons/md";

const Toast = ({ message, type = "success", is_visible, onClose }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 z-50",
        "rounded-lg border-2 px-3.5 py-2.5 w-full max-w-52",
        "text-sm font-semibold",
        "text-white shadow-neo-md shadow-black-950 border-black-950 ",
        "transition-all duration-300 ease-out",
        type === "success" ? "bg-emerald-500" : "bg-rose-500",
        is_visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
      )}>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="shrink-0 opacity-80 hover:opacity-100">
        <MdClose className="size-4" />
      </button>
    </div>
  );
};

export default Toast;
