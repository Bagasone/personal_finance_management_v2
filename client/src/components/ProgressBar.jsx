import { cn } from "../utils";

const ProgressBar = ({ fill, color }) => {
  return (
    <div
      className={cn(
        "flex justify-start items-center",
        "rounded-full w-full h-3 overflow-hidden",
        "bg-black-300/30",
      )}>
      <div
        style={{ width: `${fill ?? 0}%` }}
        className={`rounded-lg h-2.5 ${color}`}></div>
    </div>
  );
};

export default ProgressBar;
