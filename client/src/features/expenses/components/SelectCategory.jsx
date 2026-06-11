import { EXPENSE_CATEGORIES } from "../../../constants";

const SelectCategory = ({ value, onChange }) => {
  return (
    <select
      name="category"
      id="category"
      value={value}
      onChange={onChange}
      className="">
        <Option value="" label="all category" />
      {EXPENSE_CATEGORIES.map((cat) => (
        <Option
          key={cat.id}
          value={cat.id}
          label={cat.name}
        />
      ))}
    </select>
  );
};

const Option = ({ value, label }) => {
  return <option value={value}>{label}</option>;
};

export default SelectCategory;
