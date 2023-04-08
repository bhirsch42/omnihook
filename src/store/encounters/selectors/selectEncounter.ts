import { RootState } from "../..";
import { Encounter } from "../../../schemas/encounter.schema";

export const selectEncounter =
  (id: string) =>
  (state: RootState): Encounter => {
    const encounter = state.encounters.all.find((o) => o.id === id);
    if (!encounter) throw new Error(`Could not find encounter with id: ${id}`);
    return encounter;
  };
