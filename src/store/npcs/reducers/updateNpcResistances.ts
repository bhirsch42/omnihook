import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";

type UpdateNpcResistancesPayload = {
  npcId: string;
  resistanceIds: string[];
};

export function updateNpcResistancesReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<UpdateNpcResistancesPayload>
) {
  const {
    payload: { npcId, resistanceIds },
  } = action;

  const npc = state.all.find((o) => o.id === npcId);

  if (!npc) {
    throw new Error(`Could not find npc with id ${npcId}`);
  }

  npc.combatStatus.resistances = resistanceIds;
}
