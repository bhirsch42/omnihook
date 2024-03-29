import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Provider } from "react-redux";
import "@total-typescript/ts-reset";
import initWASM, * as WASM from "omnihook-rs";

import "@fontsource/source-code-pro/200-italic.css";
import "@fontsource/source-code-pro/200.css";
import "@fontsource/source-code-pro/300-italic.css";
import "@fontsource/source-code-pro/300.css";
import "@fontsource/source-code-pro/400-italic.css";
import "@fontsource/source-code-pro/400.css";
import "@fontsource/source-code-pro/500-italic.css";
import "@fontsource/source-code-pro/500.css";
import "@fontsource/source-code-pro/600-italic.css";
import "@fontsource/source-code-pro/600.css";
import "@fontsource/source-code-pro/700-italic.css";
import "@fontsource/source-code-pro/700.css";
import "@fontsource/source-code-pro/800-italic.css";
import "@fontsource/source-code-pro/800.css";
import "@fontsource/source-code-pro/900-italic.css";
import "@fontsource/source-code-pro/900.css";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

initWASM().then(() => {
  const scriptRunner = WASM.LancerScript.new();
  // const result = 40 + 2 + 2 * (30 * -5);
  console.log(
    "EVAL",
    scriptRunner.eval_script("let a = 100; 40 + 2 + 2 * (30 * -5)")
  );

  console.log("EVAL", scriptRunner.eval_script("let b = 100; b * 2"));
});
