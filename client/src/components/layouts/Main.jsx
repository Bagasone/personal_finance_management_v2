import { Outlet } from "react-router";

import { cn } from "../../utils";

const Main = ({ cls }) => {
  return (
    <main className={cn(" overflow-y-scroll relative w-full h-full p-safe-area", cls)}>
      <Outlet />
    </main>
  );
};

export default Main;
