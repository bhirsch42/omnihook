import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

type Pilot = {
  id: string;
  name: string;
};

type PilotsState = {
  activePilotId: string | null;
  all: Pilot[];
};

const initialState: PilotsState = {
  activePilotId: null,
  all: [],
};

export const pilotsSlice = createSlice({
  name: "pilots",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createPilot: (state, action: PayloadAction<Pilot>) => {
      state.all.push(action.payload);
    },
  },
});

export const { createPilot } = pilotsSlice.actions;

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
