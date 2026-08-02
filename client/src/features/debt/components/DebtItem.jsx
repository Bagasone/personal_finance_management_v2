import { formatCurrency, formatDate } from "../../../utils/formatter";
import { typeIndicator } from "../utils/";

import { TYPE_ICONS } from "../../../constants/icons";

import Button from "../../../components/Button";

const DebtItem = ({ data, onEdit, onDelete, onDetail }) => {
  const Icon = TYPE_ICONS[data.type];

  const due_date = new Date(data.due_date);
  const { type_label, type_cls, remaining_cls } = typeIndicator(
    data.remaining_amount,
    data.type,
  );

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(data.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(data);
  };

  const handleDetail = () => {
    onDetail(data);
  };

  return (
    <li
      onClick={handleDetail}
      className="box grid grid-cols-12 w-full items-center gap-3 text-sm">
      <div className="col-span-1 flex justify-center items-center">
        <span className="stroke-2">
          <Icon className="size-6" />
        </span>
      </div>
      <div className="col-span-8 flex flex-col gap-3 border rounded-sm px-2 py-1">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <div
              title={data.description}
              className="truncate text-lg font-medium">
              {data.description}
            </div>
            <div className={`border rounded-sm px-2 py-1 truncate ${type_cls}`}>
              {type_label}
            </div>
          </div>
          <div
            className={`border rounded-sm px-2 py-1 truncate text-lg font-medium ${remaining_cls}`}>
            {formatCurrency(data.remaining_amount)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="border rounded-sm px-2 py-1 truncate">
            {data.due_date
              ? `Due: ${formatDate(due_date, { month: "short" })}`
              : "No Due date"}
          </div>
          <div className="border rounded-sm px-2 py-1 truncate">
            {formatCurrency(data.total_amount)}
          </div>
        </div>
      </div>
      <div className="col-span-3 flex justify-center items-center gap-3 border rounded-sm px-2 py-1 truncate">
        <Button
          label="Edit"
          onClick={handleEdit}
          className="border rounded-sm px-2 py-1"
        />
        <Button
          label="Delete"
          onClick={handleDelete}
          className="border rounded-sm px-2 py-1"
        />
      </div>
    </li>
  );
};

export default DebtItem;
