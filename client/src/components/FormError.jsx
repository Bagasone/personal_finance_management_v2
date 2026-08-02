import { cn } from "../utils";
import { IconAlertCircle } from "@tabler/icons-react";

const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        "rounded-lg px-3 py-1 w-full",
        "bg-rose-50",
      )}>
      <IconAlertCircle className="size-5 text-rose-500 shrink-0" />
      <p className="text-sm font-medium text-rose-700">{message}</p>
    </div>
  );
};

export default FormError;
