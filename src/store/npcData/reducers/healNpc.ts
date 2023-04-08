import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";
import { SelectNpcReturns } from "../selectors/selectNpcById";

type HealNpcPayload = {
  npc: SelectNpcReturns;
  amount: number;
};

export function healNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<HealNpcPayload>
) {
  const {
    payload: { npc, amount },
  } = action;

  const npcData = state.all.find((o) => o.id === npc.id);

  if (!npcData) {
    throw new Error(`Could not find npc with id ${npc.id}`);
  }

  npcData.combatStatus.damageReceived = Math.max(
    npcData.combatStatus.damageReceived - amount,
    0
  );
}
