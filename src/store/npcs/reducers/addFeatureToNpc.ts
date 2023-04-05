import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";

type AddFeatureToNpcPayload = {
  npcId: string;
  featureId: string;
};

export function addFeatureToNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<AddFeatureToNpcPayload>
) {
  const {
    payload: { npcId, featureId },
  } = action;

  const npc = state.all.find((o) => o.id === npcId);

  if (!npc) {
    throw new Error(`Could not find npc with id ${npcId}`);
  }

  npc.featureIds.push(featureId);
}
