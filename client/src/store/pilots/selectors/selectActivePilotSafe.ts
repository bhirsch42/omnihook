import { RootState } from "../..";
import { Pilot } from "../../../schemas/pilot.schema";

export function selectActivePilotSafe(state: RootState): Pilot | null {
  return (
    state.pilots.all.find((p) => p.id === state.pilots.activePilotId) || null
  );
}
