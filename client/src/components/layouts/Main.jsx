import { Outlet } from "react-router";

import { cn } from "../../utils";

const Main = ({ cls }) => {
  return (
    <main className={cn("w-full h-full p-safe-area overflow-y-scroll", cls)}>
      <Outlet />
    </main>
  );
};

export default Main;
