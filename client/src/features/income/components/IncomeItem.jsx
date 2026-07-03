import { labelSource } from "../../../utils/label";
import { iconSource } from "../../../utils/icon";

import Button from "../../../components/Button";

const IncomeItem = ({ item, onEdit, onDelete }) => {
  const Label = labelSource(item.sourceId);
  const Icon = iconSource(item.sourceId);

  return (
    <li className="grid grid-cols-12 w-full items-center gap-3 border rounded-sm px-3 py-1 text-sm">
      <div className="col-span-3 flex items-center gap-3 border rounded-sm px-2 py-1">
        <Icon />
        <span
          title={item.description}
          className="truncate">
          {item.description}
        </span>
      </div>
      <div className="col-span-2 border rounded-sm px-2 py-1 truncate">{item.amount}</div>
      <div className="col-span-2 border rounded-sm px-2 py-1 truncate">{Label}</div>
      <div className="col-span-2 border rounded-sm px-2 py-1 truncate">{item.date}</div>
      <div className="col-span-3 flex justify-center items-center gap-3 border rounded-sm px-2 py-1 truncate">
        <Button
          label="Edit"
          onClick={() => onEdit(item)}
        />
        <Button
          label="Delete"
          onClick={() => onDelete(item.id)}
        />
      </div>
    </li>
  );
};

export default IncomeItem;
