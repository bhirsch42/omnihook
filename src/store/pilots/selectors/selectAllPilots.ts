import { RootState } from "../..";
import { Pilot } from "../../../schemas/pilot.schema";

export function selectAllPilots(state: RootState): Pilot[] {
  return state.pilots.all;
}
