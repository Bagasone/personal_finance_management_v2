import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Main from "../components/Main";

const AppLayout = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-1 max-h-dvh min-h-dvh py-3 pr-3 bg-black-900">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="col-span-11 flex flex-col overflow-hidden rounded-4xl px-6 bg-black-100">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
