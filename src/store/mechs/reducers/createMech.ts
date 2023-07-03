import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { CreateMech } from "../../../schemas/createMech.schema";
import { MechsState } from "..";
import { v4 as uuidv4 } from "uuid";

export function createMechReducer(
  state: Draft<MechsState>,
  action: PayloadAction<CreateMech>
) {
  state.all.push({
    ...action.payload,
    id: uuidv4(),
  });
}
