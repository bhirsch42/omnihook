import { RootState } from "../..";
import { Encounter } from "../../../schemas/encounter.schema";

export function selectAllEncounters(state: RootState): Encounter[] {
  return state.encounters.all;
}
