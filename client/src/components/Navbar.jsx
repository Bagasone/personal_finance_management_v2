import { PROFILE_IMAGE } from "../constants";
import { LayoutDashboard, Bell, Globe } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="User actions">
      <div
        className="flex items-center rounded-lg p-0.5"
        role="group"
        aria-label="Theme (UI only)">
        <button
          type="button"
          className="rounded-md bg-white p-2 text-black-900 shadow-sm"
          title="Default theme"
          aria-label="Default theme">
          <LayoutDashboard />
        </button>
      </div>

      <button
        type="button"
        className="rounded-lg p-2 text-black-900 shadow-sm"
        title="Settings"
        aria-label="Settings">
        <Bell />
      </button>

      <button
        type="button"
        className="rounded-lg px-2.5 py-2 text-sm font-medium text-black-900 shadow-sm"
        title="Language"
        aria-label="Language">
        <span className="flex items-center gap-1.5">
          <Globe />
          EN
        </span>
      </button>

      <div className="flex items-center gap-2.5 ml-5 rounded-lg px-2.5 py-2 shadow-sm">
        <img
          src={PROFILE_IMAGE}
          alt="Bagas profile"
          className="size-9 rounded-full object-cover"
        />
        <span className="hidden text-base font-bold sm:inline">Bagas</span>
      </div>
    </nav>
  );
};

export default Navbar;
