import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";
import { SelectNpcReturns } from "../selectors/selectNpcById";

type DamageNpcPayload = {
  npc: SelectNpcReturns;
  amount: number;
};

export function damageNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<DamageNpcPayload>
) {
  const {
    payload: { npc, amount },
  } = action;

  const npcData = state.all.find((o) => o.id === npc.id);

  if (!npcData) {
    throw new Error(`Could not find npc with id ${npc.id}`);
  }

  if (npcData.combatStatus.overshield >= amount) {
    npcData.combatStatus.overshield -= amount;
    return;
  }

  npcData.combatStatus.damageReceived = Math.min(
    npcData.combatStatus.damageReceived +
      amount -
      npcData.combatStatus.overshield,
    npc.stats.maxHp
  );

  npcData.combatStatus.overshield = 0;
}
