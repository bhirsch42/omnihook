import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { PilotsState } from "..";
import { Pilot } from "../../../schemas/pilot.schema";

export function incrementLicenseLevelReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<Pilot["id"]>
) {
  const pilotId = action.payload;
  const pilot = state.all.find((pilot) => pilot.id === pilotId);
  if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);

  pilot.licenseLevelSnapshots[pilot.licenseLevel] = {
    skills: pilot.skills,
  };

  pilot.canReallocate = true;
  pilot.licenseLevel++;
}
