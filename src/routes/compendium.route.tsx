import { Route } from "@tanstack/react-router";
import { Compendium } from "../pages/Compendium.page";
import { rootRoute } from "../router";

export const compendiumRoute = new Route({
  component: Compendium,
  getParentRoute: () => rootRoute,
  path: "/compendium",
});
