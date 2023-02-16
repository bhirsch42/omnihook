import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import compconBackup from "./fixtures/compconBackup.json";
import { compconBackupSchema } from "./schemas/compconBackup.schema";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

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

console.log("RAW COMPCON BACKUP", compconBackup);
console.log("PARSED COMPCON BACKUP", compconBackupSchema.parse(compconBackup));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
