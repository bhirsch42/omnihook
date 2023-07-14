import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Provider } from "react-redux";
import "@total-typescript/ts-reset";
import initWASM, * as WASM from "omnihook-rs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionManager, useSession } from "./SessionManager";
import { store } from "./store";
import "./fonts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionManager>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </SessionManager>
    </QueryClientProvider>
  </React.StrictMode>
);

initWASM().then(() => {
  const scriptRunner = WASM.LancerScript.new();

  console.log(
    "EVAL",
    scriptRunner.eval_script(
      "let a = 100; let b = 40 + 2 + 2 * (30 * -5); b * a"
    )
  );
});
