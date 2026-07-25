import { useState, useRef, useCallback } from "react";

let id_counter = 0;

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const timers_ref = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers_ref.current[id]);
    delete timers_ref.current[id];
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = ++id_counter;

      setToasts((prev) => [...prev, { id, message, type, is_visible: false }]);

      // 1 paint browser with waiting time of 16ms
      requestAnimationFrame(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, is_visible: true } : t)),
        );
      });

      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, is_visible: false } : t)),
        );
        setTimeout(() => removeToast(id), 300);
      }, 3500);
    },
    [removeToast],
  );

  const closeToast = useCallback(
    (id) => {
      clearTimeout(timers_ref.current[id]);
      setToasts((prev) => prev.filter((t) => t.id !== id));
      setTimeout(() => removeToast(id), 300);
    },
    [removeToast],
  );

  return { toasts, showToast, closeToast };
};

export default useToast;
