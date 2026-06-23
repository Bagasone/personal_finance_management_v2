const Button = ({ label, type = "button", onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="border px-3 py-1 rounded-sm text-sm cursor-pointer">
      {label}
    </button>
  );
};

export default Button;
