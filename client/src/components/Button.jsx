const Button = ({ label, type = "button", onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="box text-sm cursor-pointer">
      {label}
    </button>
  );
};

export default Button;
