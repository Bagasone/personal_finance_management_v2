import { cn } from "../utils";

const FAB = ({ cls, onClick, children, ...props }) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        "flex justify-center items-center gap-1",
        "text-sm font-medium",
        "size-14 rounded-full border-2 px-3 py-1",
        "shadow-neo-md shadow-black-900 border-black-900",
        "transition-all",
        "active:shadow-none active:translate-y-0.75",
        "fixed bottom-24 left-1/2 -translate-x-1/2 z-10",
        cls,
      )}>
      {children}
    </button>
  );
};

export default FAB;
