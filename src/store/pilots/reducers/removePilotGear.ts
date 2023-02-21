import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { PilotsState } from "..";
import { PilotGear } from "../../../schemas/lancerData/pilotGear.schema";
import { Pilot } from "../../../schemas/pilot.schema";

export function removePilotGearReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<{
    pilotId: Pilot["id"];
    pilotGearId: PilotGear["id"];
  }>
) {
  const { pilotId, pilotGearId } = action.payload;
  const pilot = state.all.find((pilot) => pilot.id === pilotId);
  if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);

  pilot.gear = pilot.gear.filter((gear) => gear.pilotGearId !== pilotGearId);
}
