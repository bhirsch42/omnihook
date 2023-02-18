import { Route } from "@tanstack/react-router";
import { Compendium } from "../pages/Compendium.page";
import { ChoosePilot } from "../pages/ChoosePilot.page";
import { rootRoute } from "../router";

export const pilotsRoute = new Route({
  component: ChoosePilot,
  getParentRoute: () => rootRoute,
  path: "/pilots",
});
