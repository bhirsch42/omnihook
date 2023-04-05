import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";

type DeleteNpcPayload = {
  id: string;
};

export function deleteNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<DeleteNpcPayload>
) {
  const {
    payload: { id },
  } = action;

  state.all = state.all.filter((o) => o.id !== id);
}
