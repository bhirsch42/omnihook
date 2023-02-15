import { Route } from "@tanstack/react-router";
import { Compendium } from "../pages/Compendium.page";
import { Pilots } from "../pages/Pilots.page";
import { rootRoute } from "../router";

export const pilotsRoute = new Route({
  component: Pilots,
  getParentRoute: () => rootRoute,
  path: "/pilots",
});
