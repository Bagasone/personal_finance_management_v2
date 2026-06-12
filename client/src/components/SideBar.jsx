import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

import {
  TbChartPie,
  TbMoneybagEdit,
  TbCashBanknoteMove,
  TbCashBanknoteMoveBack,
  TbBuildingBank,
  TbLogout,
} from "react-icons/tb";

const linkClass = ({ isActive }) =>
  [
    "rounded-lg p-2  text-base font-bold capitalize transition-colors",
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
        <NavLink
          to="/"
          end={true}
          className={linkClass}>
          <TbChartPie className="size-7" />
        </NavLink>
        <NavLink
          to="/expenses"
          className={linkClass}>
          <TbCashBanknoteMove className="size-7" />
        </NavLink>
        <NavLink
          to="/incomes"
          className={linkClass}>
          <TbCashBanknoteMoveBack className="size-7" />
        </NavLink>
        <NavLink
          to="/budgets"
          className={linkClass}>
          <TbMoneybagEdit className="size-7" />
        </NavLink>
        <NavLink
          to="/debts"
          className={linkClass}>
          <TbBuildingBank className="size-7" />
        </NavLink>
      </nav>

      <button
        type="button"
        to={"/login"}
        onClick={logout}
        aria-label="Logout"
        className="mt-4 rounded-lg px-3 py-2 text-sm font-bold transition-colors cursor-pointer text-slate-400 hover:bg-black-100 hover:text-rose-500">
        <TbLogout className="size-8" />
      </button>
    </aside>
  );
};

export default SideBar;
