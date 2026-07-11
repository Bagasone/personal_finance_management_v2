import { useEffect, useRef, useState } from "react";

const useToast = () => {
  const [toast, setToast] = useState(null);
  const timer_ref = useRef(null);

  const showToast = (message, type = "success") => {
    if (timer_ref.current) clearTimeout(timer_ref.current);

    setToast({ message, type });
    timer_ref.current = setTimeout(() => setToast(null), 3500);
  };

  const closeToast = () => {
    if (timer_ref.current) clearTimeout(timer_ref.current);
    setToast(null);
  };

  useEffect(() => () => clearTimeout(timer_ref.current), []);

  return { toast, showToast, closeToast };
};

export default useToast;
