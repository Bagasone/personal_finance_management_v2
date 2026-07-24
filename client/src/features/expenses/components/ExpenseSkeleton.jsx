import { cn } from "../../../utils";

const ExpenseSkeleton = () => {
  return (
    <div className="flex flex-col justify-center gap-5 animate-pulse">
      <h1 className="sr-only">Expenses</h1>

      <div
        className={cn(
          "flex flex-col gap-3 px-5 py-3",
          "rounded-lg border-2 border-black-900 shadow-neo-lg shadow-black-900",
          "bg-black-900",
        )}>
        <div className="flex justify-between items-center w-full">
          <div className="h-3 w-24 rounded bg-black-700" />
          <div className="h-5 w-16 rounded-full bg-black-700" />
        </div>
        <div className="h-6 w-40 rounded bg-black-700" />
        <div className="h-3 w-48 rounded bg-black-700" />
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(50px,1fr))_auto] gap-2 w-full">
        <div className="h-9 rounded-md border-2 border-black-900 shadow-neo-md shadow-black-900 bg-black-200" />
        <div className="h-9 rounded-md border-2 border-black-900 shadow-neo-md shadow-black-900 bg-black-200" />
        <div className="h-9 w-9 rounded-md border-2 border-black-900 shadow-neo-md shadow-black-900 bg-black-200" />
      </div>

      <div className="flex justify-between items-center">
        <div className="h-4 w-32 rounded bg-black-200" />
        <div className="h-3 w-16 rounded bg-black-200" />
      </div>

      <div
        className={cn(
          "flex flex-col divide-y divide-black-200",
          "w-full rounded-lg border-2 border-black-900 shadow-neo-lg shadow-black-900",
          "overflow-hidden",
        )}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[40px_1.5fr_1fr] items-center gap-5 px-5 py-3">
            <div className="size-10 rounded-lg bg-black-200" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-3/4 rounded bg-black-200" />
              <div className="h-3 w-1/2 rounded bg-black-200" />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="h-4 w-16 rounded bg-black-200" />
              <div className="h-3 w-10 rounded bg-black-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSkeleton;
