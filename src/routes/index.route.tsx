import { Route } from "@tanstack/react-router";
import { Home } from "../pages/Home.page";
import { rootRoute } from "../router";

export const indexRoute = new Route({
  component: Home,
  getParentRoute: () => rootRoute,
  path: "/",
});
