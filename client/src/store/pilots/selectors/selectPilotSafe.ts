import { RootState } from "../..";
import { Pilot } from "../../../schemas/pilot.schema";

export const selectPilotSafe =
  (id: string | null | undefined) =>
  (state: RootState): Pilot | null => {
    if (!id) return null;
    return state.pilots.all.find((p) => p.id === id) || null;
  };
