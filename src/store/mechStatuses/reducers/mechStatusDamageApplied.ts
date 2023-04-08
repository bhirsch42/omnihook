import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { MechStatusesState } from "..";

type mechStatusDamageAppliedPayload = {
  mechStatusId: string;
  amount: number;
  maxHp: number;
};

export function mechStatusDamageAppliedReducer(
  state: Draft<MechStatusesState>,
  action: PayloadAction<mechStatusDamageAppliedPayload>
) {
  const {
    payload: { mechStatusId, amount, maxHp },
  } = action;

  const mechStatus = state.entities[mechStatusId];

  if (!mechStatus)
    throw new Error(`Could not find mechStatus with id ${mechStatusId}`);

  if (mechStatus.overshield >= amount) {
    mechStatus.overshield -= amount;
    return;
  }

  mechStatus.damageReceived = Math.min(
    mechStatus.damageReceived + amount - mechStatus.overshield,
    maxHp
  );

  mechStatus.overshield = 0;
}
