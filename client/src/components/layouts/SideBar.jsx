import { NavLink, useLocation } from "react-router";

import { cn, iconSidebar } from "../../utils";

import { SIDEBAR_MENU } from "../../constants";

const SideBar = ({ cls }) => {
  const location = useLocation();

  return (
    <nav
      aria-label="User page navigation"
      className={cn(
        "flex justify-between items-stretch",
        "w-full h-20 py-2 px-safe-area rounded-t-lg",
        "bg-black-900 text-black-200",
        "relative",
        cls,
      )}>
      {SIDEBAR_MENU.map((data, index) => (
        <SidebarItem
          key={data.path}
          active_path={location.pathname}
          {...data}
        />
      ))}
      <SidebarIndicator active_path={location.pathname} />
    </nav>
  );
};

const SidebarItem = ({ path, label, icon, active_path }) => {
  const Icon = iconSidebar(icon);

  const is_active = active_path === path;

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center",
        "w-full h-full",
        "relative z-10",
      )}>
      <NavLink
        to={path}
        end={path === "/"}
        className={cn(
          "flex justify-center items-center",
          "text-base font-bold capitalize",
          "rounded-full size-16",
          "translate-y-0 transition-transform duration-300 ease-in",
          "focus:outline-background",
          is_active ? "-translate-y-10" : "hover:bg-black-700 hover:text-black-400",
        )}>
        <Icon className={cn("size-7", is_active ? "text-black-200" : "text-black-500")} />
      </NavLink>
      <span
        className={cn(
          "absolute translate-y-20 transition-transform duration-150 ease-in",
          "font-medium text-xs text-black-400",
          is_active && "translate-y-4",
        )}>
        {label}
      </span>
    </div>
  );
};

const SidebarIndicator = ({ active_path }) => {
  const active_index = SIDEBAR_MENU.findIndex((item) => item.path === active_path);
  const active_percent = (active_index + 0.5) * (100 / SIDEBAR_MENU.length);
  const active_class =
    SIDEBAR_MENU.find((item) => item.path === active_path)?.color ?? "black";

  return (
    <div className="absolute bottom-0 top-0 left-safe-area right-safe-area">
      <div
        className={cn(
          "absolute z-1 top-0 translate-y-[-50%] translate-x-[-50%]",
          "flex justify-center items-center",
          "size-20 rounded-4xl",
          "bg-black-50 transition-all duration-300 ease-out",
          "before:content-[''] before:size-2",
          "before:bg-black-900 before:shadow-black-50 before:shadow-[5px_-5px_0px_5px]",
          "before:absolute before:z-0 before:top-1/2 before:left-0 before:-translate-x-full",
          "before:rounded-tr-4xl before:border-black-50",
          "after:content-[''] after:size-2",
          "after:bg-black-900 after:shadow-black-50 after:shadow-[-5px_-5px_0px_5px]",
          "after:absolute after:top-1/2 after:right-0 after:translate-x-full",
          "after:rounded-tl-4xl after:border-black-50",
        )}
        style={{ left: `${active_percent}%` }}>
        <div
          className="z-1 size-14 transition-all rounded-4xl neo-shadow-lg outline-2 shadow-black-900 outline-black-900"
          style={{ backgroundColor: `var(--color-${active_class}-500)` }}></div>
      </div>
    </div>
  );
};

export default SideBar;
