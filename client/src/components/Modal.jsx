import { useRef, useEffect } from "react";

import { cn } from "../utils";

const Modal = ({ is_open, onClose, cls, children }) => {
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
      className={cn(
        "fixed inset-0 m-0 p-0 border-none",
        "w-screen h-screen max-w-none max-h-none",
        "bg-black-500/20",
      )}>
      <div
        className={cn("modal-panel", "w-full h-full flex items-center justify-center")}>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
