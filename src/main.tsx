import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import rawLancerData from "lancer-data";
import { lancerDataSchema } from "./schemas/lancerData.schema";
import compconBackup from "./fixtures/compconBackup.json";
import { compconBackupSchema } from "./schemas/compconBackup.schema";

console.log("RAW COMPCON BACKUP", compconBackup);
console.log("PARSED COMPCON BACKUP", compconBackupSchema.parse(compconBackup));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
