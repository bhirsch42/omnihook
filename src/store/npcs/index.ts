import { createSlice } from "@reduxjs/toolkit";
import { createNpcReducer } from "./reducers/createNpc";
import { Npc } from "../../schemas/npc.schema";

export type NpcsState = {
  all: Npc[];
};

export const npcSlice = createSlice({
  name: "npc",
  initialState: { all: [] as Npc[] },
  reducers: {
    createNpc: createNpcReducer,
  },
});

export const { createNpc } = npcSlice.actions;

export const npcsReducer = npcSlice.reducer;
