import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Provider } from "react-redux";

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
import { lancerData } from "./data/lancerData";
import { flatten, isNil, reject, uniq } from "ramda";
import { Bonus } from "./schemas/lancerData/bonus.schema";

const w = window as any;
w.lancerData = lancerData;

// const allBonuses = uniq(
//   reject(
//     isNil,
//     flatten([
//       lancerData.coreBonuses.map((coreBonus) => coreBonus.bonuses),
//       lancerData.frames.map((frame) => frame.coreSystem.activeBonuses),
//       lancerData.pilotGear.map((pilotGear) => pilotGear.bonuses),
//       lancerData.reserves.map((reserve) => reserve.bonuses),
//       lancerData.systems.map((system) => system.bonuses),
//       lancerData.talents.map((talent) =>
//         talent.ranks.map((talentRank) => talentRank.bonuses)
//       ),
//     ])
//   )
// ).map((bonus: unknown) => (bonus as Bonus).id);

console.log(lancerData.tags.map((tag) => tag.id));

// console.log(allBonuses);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
