import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import compconBackup from "./fixtures/compconBackup.json";
import { compconBackupSchema } from "./schemas/compconBackup.schema";
import "@fontsource/fira-code";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
console.log("RAW COMPCON BACKUP", compconBackup);
console.log("PARSED COMPCON BACKUP", compconBackupSchema.parse(compconBackup));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
