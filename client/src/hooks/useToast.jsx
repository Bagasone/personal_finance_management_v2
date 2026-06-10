import { useEffect, useRef, useState } from "react";

const useToast = () => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (message, type = "success") => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({ message, type });
    timerRef.current = setTimeout(() => setToast(null), 3500);
  };

  const closeToast = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { toast, showToast, closeToast };
};

export default useToast;
