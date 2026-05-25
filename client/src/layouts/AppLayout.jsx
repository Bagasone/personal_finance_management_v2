import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Main from "../components/Main";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <Main />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
