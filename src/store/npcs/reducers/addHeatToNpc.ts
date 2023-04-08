import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";
import { SelectNpcReturns } from "../selectors/selectNpc";

type AddHeatToNpcPayload = {
  npc: SelectNpcReturns;
  amount: number;
};

export function addHeatToNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<AddHeatToNpcPayload>
) {
  const {
    payload: { npc, amount },
  } = action;

  const npcData = state.all.find((o) => o.id === npc.id);

  if (!npcData) {
    throw new Error(`Could not find npc with id ${npc.id}`);
  }

  npcData.combatStatus.heatReceived = Math.min(
    npcData.combatStatus.heatReceived + amount,
    npc.stats.maxHeat
  );
}
