import { RootState } from "../..";
import { Pilot } from "../../../schemas/pilot.schema";

export function selectActivePilot(state: RootState): Pilot {
  const pilot = state.pilots.all.find(
    (p) => p.id === state.pilots.activePilotId
  );

  if (!pilot)
    throw new Error(
      `Could not find pilot with id: ${state.pilots.activePilotId}`
    );

  return pilot;
}
