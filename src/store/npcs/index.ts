import { createSlice } from "@reduxjs/toolkit";
import { createNpcReducer } from "./reducers/createNpc";
import { Npc } from "../../schemas/npc.schema";
import { addFeatureToNpcReducer } from "./reducers/addFeatureToNpc";
import { removeFeatureFromNpcReducer } from "./reducers/removeFeatureFromNpc";
import { deleteNpcReducer } from "./reducers/deleteNpc";

export type NpcsState = {
  all: Npc[];
};

export const npcSlice = createSlice({
  name: "npc",
  initialState: { all: [] as Npc[] },
  reducers: {
    createNpc: createNpcReducer,
    deleteNpc: deleteNpcReducer,
    addFeatureToNpc: addFeatureToNpcReducer,
    removeFeatureFromNpc: removeFeatureFromNpcReducer,
  },
});

export const { createNpc, deleteNpc, addFeatureToNpc, removeFeatureFromNpc } =
  npcSlice.actions;

export const npcsReducer = npcSlice.reducer;
