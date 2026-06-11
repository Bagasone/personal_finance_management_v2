const MonthPicker = ({ value, onChange }) => {
  return (
    <input
      type="month"
      value={value}
      onChange={onChange}
    />
  );
};

export default MonthPicker;
