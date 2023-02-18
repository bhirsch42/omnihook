import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatePilot } from "../../schemas/createPilot.schema";
import { v4 as uuidv4 } from "uuid";
import { Pilot } from "../../schemas/pilot.schema";
import { pilotsTestData } from "../../fixtures/pilotsTestData";
import { lancerData } from "../../data/lancerData";

export type PilotsState = {
  activePilotId: string | null;
  all: Pilot[];
};

const initialState: PilotsState = import.meta.env.DEV
  ? pilotsTestData
  : {
      activePilotId: null,
      all: [],
    };

export const pilotsSlice = createSlice({
  name: "pilots",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createPilot: (state, action: PayloadAction<CreatePilot>) => {
      state.all.push({
        id: uuidv4(),
        licenseLevel: 0,
        canReallocate: false,
        hp: lancerData.rules.basePilotHp,
        ...action.payload,
      });
    },

    setActivePilot: (state, action: PayloadAction<Pilot["id"]>) => {
      state.activePilotId = action.payload;
    },
  },
});

export const { createPilot, setActivePilot } = pilotsSlice.actions;

export const pilotsReducer = pilotsSlice.reducer;
