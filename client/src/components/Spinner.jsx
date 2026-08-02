import { cn } from "../utils";
import { IconLoader3 } from "@tabler/icons-react";

const Spinner = ({ cls }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin", cls)}>
      <IconLoader3 className="w-full h-full" />
    </div>
  );
};

export default Spinner;
