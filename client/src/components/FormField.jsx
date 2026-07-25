const FormField = ({ label, id, error, children }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-bold text-foreground">
          {label}
        </label>
      )}
      {children}
      <p className="ml-2 text-rose-500 text-sm first-letter:capitalize h-3">{error}</p>
    </div>
  );
};

export default FormField;
