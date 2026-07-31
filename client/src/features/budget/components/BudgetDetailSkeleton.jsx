import { cn } from "../../../utils";

const BudgetDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="h-9 w-40 rounded-lg border-2 border-black-900 shadow-neo-sm shadow-black-900 bg-black-200" />

      <div
        className={cn(
          "flex flex-col gap-3 px-5 py-3",
          "rounded-lg border border-black-800 shadow-neo-lg shadow-black-800",
          "bg-black-900",
        )}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-sm bg-black-700" />
            <div className="h-4 w-24 rounded bg-black-700" />
          </div>
          <div className="h-5 w-20 rounded-full bg-black-700" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-8 w-32 rounded bg-black-700" />
          <div className="h-3 w-40 rounded bg-black-700" />
        </div>
        <div className="h-3 w-full rounded-full bg-black-700" />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col justify-center items-center gap-1.5",
              "border-2 rounded-lg px-3 py-2",
              "shadow-neo-md shadow-black-900 border-black-900",
              "w-full",
            )}>
            <div className="h-3 w-14 rounded bg-black-200" />
            <div className="h-4 w-12 rounded bg-black-200" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-center px-1">
          <div className="h-4 w-32 rounded bg-black-200" />
          <div className="h-3 w-16 rounded bg-black-200" />
        </div>
        <ul className="flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <li
              key={i}
              className={cn(
                "flex justify-between items-center",
                "rounded-lg border-2 px-5 py-3",
                "bg-black-50 shadow-neo-lg shadow-black-900 border-black-900",
              )}>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-28 rounded bg-black-200" />
                <div className="h-3 w-16 rounded bg-black-200" />
              </div>
              <div className="h-4 w-16 rounded bg-black-200" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetDetailSkeleton;
