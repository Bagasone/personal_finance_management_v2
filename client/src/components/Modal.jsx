import { useRef, useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) ref.current.showModal();
    else ref.current.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="min-w-full min-h-full bg-black-500/10">
      <div className="flex flex-col justify-center items-center gap-1 min-w-dvw min-h-dvh">
        <h2 className="text-2xl">{title}</h2>
        {children}
        <button onClick={onClose}>X</button>
      </div>
    </dialog>
  );
};

export default Modal;
