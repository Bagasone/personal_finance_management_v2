import { useLocation } from "react-router";
import Navbar from "./Navbar";
import { LucideLocate } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/|\/$/g, "");

  return (
    <header className="flex items-center justify px-4 py-3">
      <div className="flex items-center justify-between w-full gap-4 px-3">
        <h1 className="text-2xl font-bold capitalize">
          {pathname ? pathname : "dashboard"}
        </h1>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
