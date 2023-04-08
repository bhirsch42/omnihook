import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";

type UpdateNpcStatusesPayload = {
  npcId: string;
  statusIds: string[];
};

export function updateNpcStatusesReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<UpdateNpcStatusesPayload>
) {
  const {
    payload: { npcId, statusIds },
  } = action;

  const npc = state.all.find((o) => o.id === npcId);

  if (!npc) {
    throw new Error(`Could not find npc with id ${npcId}`);
  }

  npc.combatStatus.statuses = statusIds;
}
