import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { MechStatusesState } from "..";

type mechStatusHealingAppliedPayload = {
  mechStatusId: string;
  amount: number;
};

export function mechStatusHealingAppliedReducer(
  state: Draft<MechStatusesState>,
  action: PayloadAction<mechStatusHealingAppliedPayload>
) {
  const {
    payload: { mechStatusId, amount },
  } = action;

  const mechStatus = state.entities[mechStatusId];

  if (!mechStatus)
    throw new Error(`Could not find mechStatus with id ${mechStatusId}`);

  mechStatus.damageReceived = Math.max(mechStatus.damageReceived - amount, 0);
}
