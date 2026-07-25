import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { LuMenu, LuSun, LuMoon, LuGlobe, LuLogOut } from "react-icons/lu";
import { cn } from "../../utils";

const MenuBar = () => {
  const { logout } = useAuth();
  const [is_open, setIsOpen] = useState(false);
  const [has_open, setHasOpen] = useState(false);
  const [is_dark, setIsDark] = useState(false);

  const handleMenu = () => {
    setHasOpen(true);
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="flex items-center justify-center z-10"
      role="menubar"
      aria-label="User settings and actions">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={is_open}
        aria-haspopup="menu"
        aria-controls="nav-menu"
        className={cn(
          "flex justify-center items-center",
          "shadow-neo-sm shadow-black-200 border border-black-200",
          "px-1 py-1 rounded-lg",
          "cursor-pointer transition-all",
          "active:shadow-none active:translate-x-0.75 active:translate-y-0.75",
        )}
        onClick={handleMenu}>
        <LuMenu className="size-7 stroke-2" />
      </button>
      <MenuBarList
        has_open={has_open}
        is_open={is_open}>
        <button
          type="button"
          role="menuitem"
          aria-label="Toggle theme"
          className={cn(
            "flex justify-start items-center gap-3 w-full",
            "px-3 py-3 border-b",
            "border-black-900 cursor-pointer transition-all",
          )}>
          <LuSun className="size-6 stroke-2" />
          <p className="text-sm font-semibold">Theme {is_dark ? "Dark" : "Light"}</p>
        </button>
        <button
          type="button"
          role="menuitem"
          aria-label="Language setting"
          className={cn(
            "flex justify-start items-center gap-3 w-full",
            "px-3 py-3 border-b",
            "border-black-900 cursor-pointer transition-all",
          )}>
          <LuGlobe className="size-6 stroke-2" />
          <p className="text-sm font-semibold">Language: EN</p>
        </button>
        <button
          type="button"
          role="menuitem"
          aria-label="Logout button"
          className={cn(
            "flex justify-start items-center gap-3 w-full",
            "px-3 py-3 border-b",
            "border-black-900 cursor-pointer transition-all",
            "hover:text-expense-500",
          )}
          onClick={logout}>
          <LuLogOut className="size-6 stroke-2" />
          <p className="text-sm font-semibold">Logout</p>
        </button>
        <div
          className={cn(
            "flex justify-center items-center gap-3 w-full",
            "px-3 py-1 border-b",
            "cursor-pointer transition-all",
            "text-black-200 bg-black-900 border-black-900",
            "active:shadow-none active:translate-x-0.75 active:translate-y-0.75",
          )}>
          <p className="text-xs font-light">© 2026 Bagas Saputra</p>
        </div>
      </MenuBarList>
    </div>
  );
};

const MenuBarList = ({ has_open, is_open, children }) => {
  if (!has_open) return null;

  return (
    <div
      role="menu"
      id="nav-menu"
      className={cn(
        "fixed top-24 right-4 w-3/7",
        "flex flex-col justify-center items-center",
        "text-black-900 bg-black-100 shadow-black-900 border-black-900",
        "shadow-neo-lg rounded-lg border",
        "transition-transform overflow-hidden",
        is_open ? "animate-scale-up opacity-100" : "animate-scale-down opacity-100",
      )}>
      {children}
    </div>
  );
};

export default MenuBar;
