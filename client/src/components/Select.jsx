import Option from "./Option";

const Select = ({ label, id, value, onChange, options, error, children }) => {
  return (
    <div className="flex flex-col text-sm">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className="box w-full ">
        {children}
        {options.map((opt) => (
          <Option
            key={opt.id}
            value={opt.id}
            label={opt.label}
          />
        ))}
      </select>
      {error && <p className="text-rose-500 first-letter:capitalize">{error}</p>}
    </div>
  );
};

export default Select;
