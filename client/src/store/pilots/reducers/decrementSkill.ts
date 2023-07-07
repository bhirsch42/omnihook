import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { PilotsState } from "..";
import { Pilot } from "../../../schemas/pilot.schema";
import { PilotSkill } from "../../../schemas/pilotSkill.schema";
import { removeSkillReducer } from "./removeSkill";

export function decrementSkillReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<{ pilotId: Pilot["id"]; skillId: PilotSkill["id"] }>
) {
  const { pilotId, skillId } = action.payload;
  const pilot = state.all.find((pilot) => pilot.id === pilotId);
  if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);
  const skill = pilot.skills.find((skill) => skill.id === skillId);
  if (!skill) throw new Error(`Could find skill: ${skillId}`);
  skill.rank--;
  if (skill.rank === 0) removeSkillReducer(state, action);
}
