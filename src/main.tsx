import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import rawLancerData from "lancer-data";
import { lancerDataSchema } from "./schemas/lancerData.schema";

console.log("RAW_DATA", rawLancerData);
const lancerData = lancerDataSchema.parse(rawLancerData);
console.log("PARSED_DATA", lancerData);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
