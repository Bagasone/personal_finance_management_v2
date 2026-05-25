const Navbar = () => {
  return (
    <nav
      className="flex items-center gap-2"
      aria-label="User actions">
      <div
        className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5"
        role="group"
        aria-label="Theme (UI only)">
        <button
          type="button"
          className="rounded-md bg-white p-2 text-teal-600 shadow-sm"
          title="Default theme"
          aria-label="Default theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
            />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </button>
        <button
          type="button"
          className="rounded-md p-2 text-slate-500 hover:bg-white hover:text-amber-500"
          title="Light theme"
          aria-label="Light theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="4"
            />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
        <button
          type="button"
          className="rounded-md p-2 text-slate-500 hover:bg-white hover:text-indigo-500"
          title="Dark theme"
          aria-label="Dark theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-teal-600"
        title="Settings"
        aria-label="Settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-4"
          aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="3"
          />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      <button
        type="button"
        className="rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-teal-600"
        title="Language"
        aria-label="Language">
        <span className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          EN
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
