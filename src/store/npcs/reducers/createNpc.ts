import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { CreateNpc } from "../../../schemas/createNpc.schema";
import { NpcsState } from "..";
import { v4 as uuidv4 } from "uuid";

export function createNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<CreateNpc>
) {
  const { payload } = action;

  state.all.push({
    id: payload.id || uuidv4(),
    featureIds: payload.class.baseFeatures,
    classId: payload.class.id,
    name: payload.class.name,
    tier: 1,
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
  });
}
