import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { CreateEncounter } from "../../../schemas/createEncounter.schema";
import { EncountersState } from "..";

export function createEncounterReducer(
  state: Draft<EncountersState>,
  action: PayloadAction<CreateEncounter>
) {
  state.all.push({
    ...action.payload,
    pcs: [],
    npcs: [],
    initiatives: [],
  });
}
