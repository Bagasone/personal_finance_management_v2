import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthContext.jsx";
import { RouterProvider } from "react-router";

import "./index.css";
import router from "./router.jsx";

async function enableMocking() {
  if (import.meta.env.MODE !== "development") return;
  const { worker } = await import("./lib/msw/browser.js");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>,
  );
});
