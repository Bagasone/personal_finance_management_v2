import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AuthProvider from "./context/AuthContext.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import router from "./router.jsx";
import { queryClient } from "./lib/queryClient.js";

import "./index.css";

async function enableMocking() {
  if (import.meta.env.MODE !== "development") return;
  const { worker } = await import("./lib/msw/browser.js");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>,
  );
});
