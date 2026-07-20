import { cn } from "../utils";

import Header from "../components/layouts/Header";
import SideBar from "../components/layouts/SideBar";
import Main from "../components/layouts/Main";

const AppLayout = () => {
  return (
    <div
      className={cn(
        "grid grid-rows-[auto_1fr_auto] grid-cols-1",
        "[grid-template-areas:'header'_'main'_'sidebar']",
        "w-dvw h-dvh overflow-hidden",
      )}>
      <Header cls="[grid-area:header]" />
      <Main cls="[grid-area:main]" />
      <SideBar cls="[grid-area:sidebar]" />
    </div>
  );
};

export default AppLayout;
