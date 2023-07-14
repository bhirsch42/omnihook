import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { lancerData } from "../../../data/lancerData";
import { CreatePilot } from "../../../schemas/createPilot.schema";
import { v4 as uuidv4 } from "uuid";
import { PilotsState } from "..";

export function createPilotReducer(
  state: Draft<PilotsState>,
  action: PayloadAction<CreatePilot>
) {
  state.all.push({
    id: uuidv4(),
    licenseLevel: 0,
    canReallocate: false,
    hp: lancerData.rules.basePilotHp,
    skills: [],
    talents: [],
    licenseLevelSnapshots: {},
    gear: [],
    ...action.payload,
    licenses: [{ licenseId: "mf_standard_pattern_i_everest", rank: 0 }],
    mechSkills: {
      hull: 0,
      agility: 0,
      systems: 0,
      engineering: 0,
    },
  });
}
