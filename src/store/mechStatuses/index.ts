import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { MechStatus } from "../../schemas/mechStatus.schema";

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
  },
});

export const mechStatusSelectors = mechStatusAdapter.getSelectors(
  (state: RootState) => state.mechStatuses
);

export const { selectById: selectMechStatusById } = mechStatusSelectors;

export const { mechStatusAdded, mechStatusUpdated, mechStatusRemoved } =
  mechStatusesSlice.actions;

export const mechStatusesReducer = mechStatusesSlice.reducer;
