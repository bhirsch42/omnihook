import { createSlice } from "@reduxjs/toolkit";
import { createEncounterReducer } from "./reducers/createEncounter";
import { Encounter } from "../../schemas/encounter.schema";
import { addNpcToEncounterReducer } from "./reducers/addNpcToEncounter";

export type EncountersState = {
  all: Encounter[];
};

export const encountersSlice = createSlice({
  name: "encounters",
  initialState: { all: [] as Encounter[] },
  reducers: {
    createEncounter: createEncounterReducer,
    addNpcToEncounter: addNpcToEncounterReducer,
  },
});

export const { createEncounter, addNpcToEncounter } = encountersSlice.actions;

export const encountersReducer = encountersSlice.reducer;
