import { Outlet } from "react-router";

const Main = () => {
  return (
    <main className="flex-1 overflow-auto p-4">
      <Outlet />
    </main>
  );
};

export default Main;
