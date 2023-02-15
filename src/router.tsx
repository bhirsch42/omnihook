import { RootRoute, ReactRouter } from "@tanstack/react-router";
import { indexRoute } from "./routes/index.route";
import App from "./App";
import { compendiumRoute } from "./routes/compendium.route";
import { pilotsRoute } from "./routes/pilots.route";

export const rootRoute = new RootRoute({ component: App });

const routeTree = rootRoute.addChildren([
  indexRoute,
  compendiumRoute,
  pilotsRoute,
]);

export const router = new ReactRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
