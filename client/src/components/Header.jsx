import Navbar from "./Navbar";

const PROFILE_IMAGE =
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibing.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-xl font-bold tracking-tight text-teal-600">
        PFM
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src={PROFILE_IMAGE}
            alt="Bagas profile"
            className="size-9 rounded-full border-2 border-teal-100 object-cover"
          />
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">
            Bagas
          </span>
        </div>

        <Navbar />
      </div>
    </header>
  );
};

export default Header;
