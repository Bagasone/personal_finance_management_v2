import { cn } from "../utils";

const ProgressBar = ({ fill, cls }) => {
  const content_width = `${fill}%`;

  return (
    <div className={cn("overflow-hidden w-full rounded-full", "bg-black-300/30")}>
      <div
        style={{ width: content_width }}
        className={cn(cls)}></div>
    </div>
  );
};

export default ProgressBar;
