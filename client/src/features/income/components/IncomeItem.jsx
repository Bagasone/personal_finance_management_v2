import { labelSource } from "../../../utils/label";
import { iconSource } from "../../../utils/icon";

import Button from "../../../components/Button";

const IncomeItem = ({ data, onEdit, onDelete }) => {
  const Icon = iconSource(data.source_id);

  const label = labelSource(data.source_id);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(data.id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(data);
  };

  return (
    <li className="box grid grid-cols-12 w-full items-center gap-3 text-sm">
      <div className="box col-span-3 flex items-center gap-3 border">
        <span className="stroke-2">
          <Icon className="size-6" />
        </span>
        <span
          title={data.description}
          className="truncate">
          {data.description}
        </span>
      </div>
      <div className="box col-span-2 border truncate">{data.amount}</div>
      <div className="box col-span-2 border truncate">{label}</div>
      <div className="box col-span-2 border truncate">{data.date}</div>
      <div className="box col-span-3 flex justify-center items-center gap-3 border truncate">
        <Button
          label="Edit"
          onClick={handleEdit}
        />
        <Button
          label="Delete"
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};

export default IncomeItem;
