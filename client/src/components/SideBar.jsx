import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

import { MENU_ITEMS } from "../constants";

const linkClass = ({ isActive }) =>
  [
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-teal-500 text-white"
      : "text-slate-600 hover:bg-teal-50 hover:text-teal-700",
  ].join(" ");

const SideBar = () => {
  const { logout } = useAuth();

  return (
    <aside className="flex w-52 shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-4">
      <nav
        className="flex flex-1 flex-col gap-1"
        aria-label="Main navigation">
        {MENU_ITEMS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={linkClass}>
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        to={"/login"}
        onClick={logout}
        aria-label="Logout"
        className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600">
        Logout
      </button>
    </aside>
  );
};

export default SideBar;
