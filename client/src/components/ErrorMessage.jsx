import { cn } from "../utils";
import { MdErrorOutline } from "react-icons/md";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col justify-center items-centerw-full h-full">
      <div
        className={cn(
          "flex flex-col justify-center items-center gap-5",
          "rounded-xl border-2 px-5 py-5",
          "neo-shadow-xl shadow-black-900",
        )}>
        <MdErrorOutline className="size-16 text-rose-500" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-black-900">{message}</h1>
          <p className="text-base font-medium text-black-500">Please try again later</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className={cn(
              "px-6 py-2 neo-border-lg",
              "text-black-200 bg-black-900 neo-shadow-md shadow-rose-500 border-shadow-900",
              "text-base font-bold",
            )}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};



export default ErrorMessage;
