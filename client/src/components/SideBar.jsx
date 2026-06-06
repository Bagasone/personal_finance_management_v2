import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

import { MENU_ITEMS } from "../constants";
import {
  LayoutDashboard,
  BanknoteArrowDown,
  BanknoteArrowUp,
  HandCoins,
  PiggyBank,
  LogOut,
} from "lucide-react";

const labelIcon = (label) => {
  switch (label) {
    case "Dashboard":
      return <LayoutDashboard />;
    case "Expenses":
      return <BanknoteArrowDown />;
    case "Incomes":
      return <BanknoteArrowUp />;
    case "Debts":
      return <HandCoins />;
    case "Budgets":
      return <PiggyBank />;
  }
};

const linkClass = ({ isActive }) =>
  [
    "rounded-lg px-3 py-2 text-base font-bold transition-colors",
    isActive
      ? "bg-black-100 text-black-900"
      : "text-slate-400 hover:bg-black-400 hover:text-black-700",
  ].join(" ");

const SideBar = () => {
  const { logout } = useAuth();

  return (
    <aside className="flex flex-col items-center gap-3 w-full h-full px-3 py-3 bg-black-900 text-black-100">
      <div className="flex text-xl font-bold tracking-tight rounded-lg px-3 py-2 bg-black-100 text-black-900">
        PFM
      </div>

      <nav
        className="flex flex-1 flex-col justify-center gap-5"
        aria-label="Main navigation">
        {MENU_ITEMS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={linkClass}>
            {labelIcon(label)}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        to={"/login"}
        onClick={logout}
        aria-label="Logout"
        className="mt-4 rounded-lg px-3 py-2 bg-black-100 text-black-900 text-sm font-bold transition-colors cursor-pointer hover:bg-rose-500 hover:text-black-200">
        <LogOut />
      </button>
    </aside>
  );
};

export default SideBar;
