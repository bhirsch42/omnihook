import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatePilot } from "../../schemas/createPilot.schema";
import { v4 as uuidv4 } from "uuid";
import { Pilot } from "../../schemas/pilot.schema";
import { pilotsTestData } from "../../fixtures/pilotsTestData";
import { lancerData } from "../../data/lancerData";
import { PilotSkill } from "../../schemas/pilotSkill.schema";
import { selectPilot } from "./selectors/selectPilot";

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
        skills: [],
        ...action.payload,
      });
    },

    setActivePilot: (state, action: PayloadAction<Pilot["id"]>) => {
      state.activePilotId = action.payload;
    },

    addSkill: (
      state,
      action: PayloadAction<{ pilotId: Pilot["id"]; skillId: PilotSkill["id"] }>
    ) => {
      const { pilotId, skillId } = action.payload;
      const pilot = state.all.find((pilot) => pilot.id === pilotId);
      if (!pilot) throw new Error(`Couldn't find pilot: ${pilotId}`);
      pilot.skills.push({
        id: skillId,
        rank: 1,
      });
    },
  },
});

export const { createPilot, setActivePilot, addSkill } = pilotsSlice.actions;

export const pilotsReducer = pilotsSlice.reducer;
