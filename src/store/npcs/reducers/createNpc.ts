import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { CreateNpc } from "../../../schemas/createNpc.schema";
import { NpcsState } from "..";
import { v4 as uuidv4 } from "uuid";

export function createNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<CreateNpc>
) {
  state.all.push({
    id: uuidv4(),
    name: "",
    classId: "",
    tier: 1,
    featureIds: [],
    stats: {
      statuses: [],
      conditions: [],
      resistances: [],
      hp: 0,
      overshield: 0,
      heat: 0,
      moves: 0,
      burn: 0,
      activations: 0,
    },
    ...action.payload,
  });
}
