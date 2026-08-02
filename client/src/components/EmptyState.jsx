import { cn } from "../utils";
import { IconInboxOff } from "@tabler/icons-react";

const EmptyState = ({ title, description, icon_cls, Icon = IconInboxOff, children }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-5",
        "rounded-lg border-2 border-dotted p-9",
        "shadow-neo-xl shadow-black-800 border-black-900",
      )}>
      <Icon className={cn("size-12", icon_cls)} />
      <div className="flex flex-col">
        <h2 className="text-center text-lg font-bold text-black-900">{title}</h2>
        <p className="text-center text-xs font-normal text-black-500">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default EmptyState;
