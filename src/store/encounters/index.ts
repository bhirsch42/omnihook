import { createSlice } from "@reduxjs/toolkit";
import { createEncounterReducer } from "./reducers/createEncounter";
import { Encounter } from "../../schemas/encounter.schema";

export type EncountersState = {
  all: Encounter[];
};

export const encountersSlice = createSlice({
  name: "encounters",
  initialState: { all: [] },
  reducers: {
    createEncounter: createEncounterReducer,
  },
});

export const { createEncounter } = encountersSlice.actions;
