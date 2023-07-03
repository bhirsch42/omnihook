import { createSlice } from "@reduxjs/toolkit";
import { createMechReducer } from "./reducers/createMech";
import { Mech } from "../../schemas/mech.schema";

export type MechsState = {
  all: Mech[];
};

export const mechsSlice = createSlice({
  name: "mechs",
  initialState: { all: [] as Mech[] },
  reducers: {
    createMech: createMechReducer,
  },
});

export const { createMech } = mechsSlice.actions;

export const mechsReducer = mechsSlice.reducer;
