import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { NpcData } from "../../schemas/npcData.schema";
import { RootState } from "..";

const npcDataAdapter = createEntityAdapter<NpcData>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export type NpcDataState = ReturnType<typeof npcDataAdapter.getInitialState>;

export const npcDataSlice = createSlice({
  name: "npcData",
  initialState: npcDataAdapter.getInitialState(),
  reducers: {
    npcAdded: npcDataAdapter.addOne,
    npcRemoved: npcDataAdapter.removeOne,
    npcUpdated: npcDataAdapter.updateOne,
  },
});

export const npcDataSelectors = npcDataAdapter.getSelectors(
  (state: RootState) => state.npcData
);

export const { selectById: selectNpcDataById } = npcDataSelectors;

export const { npcAdded, npcRemoved, npcUpdated } = npcDataSlice.actions;

export const npcsReducer = npcDataSlice.reducer;
