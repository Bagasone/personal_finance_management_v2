import { cn } from "../../../utils";

const BudgetSkeleton = () => {
  return (
    <div className="flex flex-col justify-center gap-5 pb-20 animate-pulse">
      <h1 className="sr-only">Budgets</h1>

      <div
        className={cn(
          "flex flex-col gap-3 px-5 py-3",
          "rounded-lg border border-black-800 shadow-neo-lg shadow-black-800",
          "bg-black-900",
        )}>
        <div className="flex justify-between items-center w-full">
          <div className="h-3 w-28 rounded bg-black-700" />
          <div className="h-5 w-16 rounded-full bg-black-700" />
        </div>
        <div className="h-8 w-40 rounded bg-black-700" />
        <div className="h-3 w-56 rounded bg-black-700" />
      </div>

      <div className="grid grid-cols-[minmax(50px,1fr)_auto] gap-3 w-full">
        <div className="h-10 rounded-md border-2 border-black-900 shadow-neo-md shadow-black-900 bg-black-200" />
        <div className="h-10 w-10 rounded-md border-2 border-black-900 shadow-neo-md shadow-black-900 bg-black-200" />
      </div>

      <div className="flex justify-between items-center px-1">
        <div className="h-4 w-32 rounded bg-black-200" />
        <div className="h-3 w-16 rounded bg-black-200" />
      </div>

      <div className="flex flex-col gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-3 px-5 py-3",
              "rounded-lg border-2 border-black-900 shadow-neo-lg shadow-black-900",
              "bg-black-50",
            )}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-7 rounded-lg bg-black-200" />
                <div className="h-4 w-24 rounded bg-black-200" />
              </div>
              <div className="h-5 w-16 rounded-lg bg-black-200" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-2 w-full rounded-full bg-black-200" />
              <div className="flex justify-between items-center">
                <div className="h-3 w-28 rounded bg-black-200" />
                <div className="h-4 w-8 rounded bg-black-200" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <div className="size-5 rounded bg-black-200" />
              <div className="size-5 rounded bg-black-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSkeleton;
