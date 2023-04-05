import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { CreateEncounter } from "../../../schemas/createEncounter.schema";
import { EncountersState } from "..";
import { v4 as uuidv4 } from "uuid";

type AddNpcToEncounterPayload = {
  npcId: string;
  encounterId: string;
};

export function addNpcToEncounterReducer(
  state: Draft<EncountersState>,
  action: PayloadAction<AddNpcToEncounterPayload>
) {
  const {
    payload: { npcId, encounterId },
  } = action;

  const encounter = state.all.find((o) => o.id === encounterId);

  if (!encounter)
    throw new Error(`Could not find encounter with id ${encounterId}`);

  encounter.npcs.push(npcId);
}
