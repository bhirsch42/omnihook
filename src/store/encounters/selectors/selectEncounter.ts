import { RootState } from "../..";
import { Encounter } from "../../../schemas/encounter.schema";
import { DenormalizedNpc, selectNpc } from "../../npcs/selectors/selectNpc";

type DenormalizedEncounter = Omit<Encounter, "npcs"> & {
  npcs: DenormalizedNpc[];
};

export const selectEncounter =
  (id: string) =>
  (state: RootState): DenormalizedEncounter => {
    const encounter = state.encounters.all.find((o) => o.id === id);
    if (!encounter) throw new Error(`Could not find encounter with id: ${id}`);
    return {
      ...encounter,
      npcs: encounter.npcs.map((npcId) => selectNpc(npcId)(state)),
    };
  };
