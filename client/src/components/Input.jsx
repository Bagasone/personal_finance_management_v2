const Input = ({ type = "text", label, id, value, onChange, error }) => {
  return (
    <div className="flex flex-col text-sm">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-1 rounded-sm text-sm cursor-pointer"
      />
      {error && <p className="text-rose-500 first-letter:capitalize">{error}</p>}
    </div>
  );
};

export default Input;
