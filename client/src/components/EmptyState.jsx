const EmptyState = ({ message, actionLabel, onAction, children }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 w-full h-full">
      {children}
      <p className="text-center text-xl font-semibold">{message}</p>
      {actionLabel && (
        <button
          className="border px-3 py-1 rounded-sm text-sm"
          onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
