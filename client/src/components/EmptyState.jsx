const EmptyState = ({ message, action_label, onAction, children }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 w-full h-full">
      {children}
      <p className="text-center text-xl font-semibold">{message}</p>
      {action_label && (
        <button
          className="border px-3 py-1 rounded-sm text-sm"
          onClick={onAction}>
          {action_label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
