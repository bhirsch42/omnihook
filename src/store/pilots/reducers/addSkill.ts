import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { PilotsState } from "..";
import { Pilot } from "../../../schemas/pilot.schema";
import { PilotSkill } from "../../../schemas/pilotSkill.schema";

export function addSkillReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<{ pilotId: Pilot["id"]; skillId: PilotSkill["id"] }>
) {
  const { pilotId, skillId } = action.payload;
  const pilot = state.all.find((pilot) => pilot.id === pilotId);
  if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);
  pilot.skills.push({
    id: skillId,
    rank: 1,
  });
}
