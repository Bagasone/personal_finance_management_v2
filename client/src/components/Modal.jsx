import { useRef, useEffect } from "react";

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
      className="max-w-dvw max-h-dvh overflow-hidden min-w-full min-h-full bg-black-500/20">
      <div className="box max-w-max ml-[50vw] mt-[50vh] translate-[-50%] bg-black-100">
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
