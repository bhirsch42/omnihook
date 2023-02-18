import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { CreatePilot } from "../schemas/createPilot.schema";
import { v4 as uuidv4 } from "uuid";
import { Pilot } from "../schemas/pilot.schema";
import { pilotsTestData } from "../fixtures/pilotsTestData";

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
      state.all.push({ id: uuidv4(), ...action.payload });
    },

    setActivePilot: (state, action: PayloadAction<Pilot["id"]>) => {
      state.activePilotId = action.payload;
    },
  },
});

export const { createPilot, setActivePilot } = pilotsSlice.actions;

export const selectAllPilots = (state: RootState): Pilot[] => {
  return state.pilots.all;
};

export const selectActivePilotSafe = (state: RootState): Pilot | null => {
  return (
    state.pilots.all.find((p) => p.id === state.pilots.activePilotId) || null
  );
};

export const selectActivePilot = (state: RootState): Pilot => {
  const pilot = state.pilots.all.find(
    (p) => p.id === state.pilots.activePilotId
  );

  if (!pilot)
    throw new Error(
      `Could not find pilot with id: ${state.pilots.activePilotId}`
    );

  return pilot;
};

export const pilotsReducer = pilotsSlice.reducer;
