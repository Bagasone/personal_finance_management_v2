import { cn } from "../../utils";

import Profile from "./Profile";
import MenuBar from "./MenuBar";

const Header = ({ cls }) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-3",
        "bg-black-900 text-black-100",
        "w-full h-20 p-safe-area rounded-b-lg",
        cls,
      )}>
      <Profile username="Bagas" />
      <MenuBar />
    </header>
  );
};

export default Header;
