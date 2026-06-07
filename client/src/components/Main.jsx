import { Outlet } from "react-router";

const Main = () => {
  return (
    <main className="flex-1 overflow-auto scrollbar-none">
      <Outlet />
    </main>
  );
};

export default Main;
