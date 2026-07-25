import Toast from "./Toast";

const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-safe-area right-safe-area z-50 w-52 h-0">
      {toasts.toReversed().map((t, index) => (
        <div
          key={t.id}
          className="absolute top-0 right-0 w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${index * 3.25}rem)` }}>
          <Toast
            message={t.message}
            type={t.type}
            is_visible={t.is_visible}
            onClose={() => onClose(t.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
