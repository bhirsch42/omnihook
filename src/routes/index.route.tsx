import { Route } from "@tanstack/react-router";
import { Desktop } from "../pages/Desktop.page";
import { rootRoute } from "../router";

export const indexRoute = new Route({
  component: Desktop,
  getParentRoute: () => rootRoute,
  path: "/",
});
