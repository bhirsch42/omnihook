import { RootState } from "../..";
import { Mech } from "../../../schemas/mech.schema";

export const selectMechsForPilot =
  (pilotId: string) =>
  (state: RootState): Mech[] => {
    return state.mechs.all.filter((mech) => mech.pilotId === pilotId);
  };
