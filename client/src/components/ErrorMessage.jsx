const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <p className="text-rose-500 text-xl">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="border px-3 py-1 rounded-sm text-sm">
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
