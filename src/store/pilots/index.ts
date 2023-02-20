import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pilot } from "../../schemas/pilot.schema";
import { pilotsTestData } from "../../fixtures/pilotsTestData";
import { createPilotReducer } from "./reducers/createPilot";
import { addSkillReducer } from "./reducers/addSkill";
import { incrementLicenseLevelReducer } from "./reducers/incrementLicenseLevelReducer";
import { decrementSkillReducer } from "./reducers/decrementSkill";
import { incrementSkillReducer } from "./reducers/incrementSkill";
import { addTalentRankReducer } from "./reducers/addTalentRank";
import { removeTalentRankReducer } from "./reducers/removeTalentRank";

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
    setActivePilot: (state, action: PayloadAction<Pilot["id"]>) => {
      state.activePilotId = action.payload;
    },

    createPilot: createPilotReducer,
    addSkill: addSkillReducer,
    incrementLicenseLevel: incrementLicenseLevelReducer,
    incrementSkill: incrementSkillReducer,
    decrementSkill: decrementSkillReducer,
    addTalentRank: addTalentRankReducer,
    removeTalentRank: removeTalentRankReducer,
  },
});

export const {
  createPilot,
  setActivePilot,
  addSkill,
  incrementLicenseLevel,
  incrementSkill,
  decrementSkill,
  addTalentRank,
  removeTalentRank,
} = pilotsSlice.actions;

export const pilotsReducer = pilotsSlice.reducer;
