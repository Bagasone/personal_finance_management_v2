const Toast = ({ message, type = "success", onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 flex justify-center items-center gap-1 px-3 py-1 rounded-sm
      ${type === "success" ? "bg-green-500" : "bg-rose-500"}`}>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Toast;
