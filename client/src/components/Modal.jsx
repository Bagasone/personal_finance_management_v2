import { useRef, useEffect } from "react";

import { cn } from "../utils";

const Modal = ({ is_open, onClose, children }) => {
  const ref = useRef(null);

  const handleClose = (e) => {
    if (e.target === ref.current) onClose();
  };

  useEffect(() => {
    if (is_open) ref.current.showModal();
    else ref.current.close();
  }, [is_open]);

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={handleClose}
      className={cn("overflow-hidden", "min-w-full min-h-full", "bg-black-500/20")}>
      <div
        className={cn(
          "fixed right-[50%] bottom-[50%] translate-[50%]",
          "max-w-max w-full rounded-lg border",
          "shadow-neo-xl border-black-900 shadow-black-900 bg-black-100",
        )}>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
