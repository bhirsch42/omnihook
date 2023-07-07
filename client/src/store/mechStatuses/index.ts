import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { MechStatus } from "../../schemas/mechStatus.schema";
import { mechStatusDamageAppliedReducer } from "./reducers/mechStatusDamageApplied";
import { mechStatusHealingAppliedReducer } from "./reducers/mechStatusHealingAppliedReducer";

const mechStatusAdapter = createEntityAdapter<MechStatus>();

export type MechStatusesState = ReturnType<
  typeof mechStatusAdapter.getInitialState
>;

export const mechStatusesSlice = createSlice({
  name: "mechStatus",
  initialState: mechStatusAdapter.getInitialState(),
  reducers: {
    mechStatusAdded: mechStatusAdapter.addOne,
    mechStatusUpdated: mechStatusAdapter.updateOne,
    mechStatusRemoved: mechStatusAdapter.removeOne,
    mechStatusDamageApplied: mechStatusDamageAppliedReducer,
    mechStatusHealingApplied: mechStatusHealingAppliedReducer,
  },
});

export const mechStatusSelectors = mechStatusAdapter.getSelectors(
  (state: RootState) => state.mechStatuses
);

export const {
  mechStatusAdded,
  mechStatusUpdated,
  mechStatusRemoved,
  mechStatusDamageApplied,
  mechStatusHealingApplied,
} = mechStatusesSlice.actions;

export const mechStatusesReducer = mechStatusesSlice.reducer;
