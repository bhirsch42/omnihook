import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";

type UpdateNpcConditionsPayload = {
  npcId: string;
  conditionIds: string[];
};

export function updateNpcConditionsReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<UpdateNpcConditionsPayload>
) {
  const {
    payload: { npcId, conditionIds },
  } = action;

  const npc = state.all.find((o) => o.id === npcId);

  if (!npc) {
    throw new Error(`Could not find npc with id ${npcId}`);
  }

  npc.combatStatus.conditions = conditionIds;
}
