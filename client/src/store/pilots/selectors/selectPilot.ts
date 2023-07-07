import { RootState } from "../..";
import { Pilot } from "../../../schemas/pilot.schema";

export const selectPilot =
  (id: string) =>
  (state: RootState): Pilot => {
    const pilot = state.pilots.all.find((p) => p.id === id);
    if (!pilot) throw new Error(`Could not find pilot with id: ${id}`);
    return pilot;
  };
