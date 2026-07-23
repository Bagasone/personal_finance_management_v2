import { cn } from "../utils";
import { CgSpinner } from "react-icons/cg";

const Spinner = ({ cls }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin", cls)}>
      <CgSpinner className="w-full h-full" />
    </div>
  );
};

export default Spinner;
