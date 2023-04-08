import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";
import { SelectNpcReturns } from "../selectors/selectNpcById";

type AddOvershieldToNpcPayload = {
  npc: SelectNpcReturns;
  amount: number;
};

export function addOvershieldToNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<AddOvershieldToNpcPayload>
) {
  const {
    payload: { npc, amount },
  } = action;

  const npcData = state.all.find((o) => o.id === npc.id);

  if (!npcData) {
    throw new Error(`Could not find npc with id ${npc.id}`);
  }

  npcData.combatStatus.overshield += amount;
}
