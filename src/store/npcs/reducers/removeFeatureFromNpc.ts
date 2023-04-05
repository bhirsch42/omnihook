import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { NpcsState } from "..";
import { without } from "ramda";

type RemoveFeatureFromNpcPayload = {
  npcId: string;
  featureId: string;
};

export function removeFeatureFromNpcReducer(
  state: Draft<NpcsState>,
  action: PayloadAction<RemoveFeatureFromNpcPayload>
) {
  const {
    payload: { npcId, featureId },
  } = action;

  const npc = state.all.find((o) => o.id === npcId);

  if (!npc) {
    throw new Error(`Could not find npc with id ${npcId}`);
  }

  npc.featureIds = without([featureId], npc.featureIds);
}
