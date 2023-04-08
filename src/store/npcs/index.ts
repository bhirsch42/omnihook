import { createSlice } from "@reduxjs/toolkit";
import { createNpcReducer } from "./reducers/createNpc";
import { Npc } from "../../schemas/npc.schema";
import { addFeatureToNpcReducer } from "./reducers/addFeatureToNpc";
import { removeFeatureFromNpcReducer } from "./reducers/removeFeatureFromNpc";
import { deleteNpcReducer } from "./reducers/deleteNpc";
import { updateNpcStatusesReducer } from "./reducers/updateNpcStatuses";
import { updateNpcConditionsReducer } from "./reducers/updateNpcConditions";
import { updateNpcResistancesReducer } from "./reducers/updateNpcResistances";
import { damageNpcReducer } from "./reducers/damageNpc";
import { healNpcReducer } from "./reducers/healNpc";
import { addOvershieldToNpcReducer } from "./reducers/addOvershieldToNpc";

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
    updateNpcStatuses: updateNpcStatusesReducer,
    updateNpcConditions: updateNpcConditionsReducer,
    updateNpcResistances: updateNpcResistancesReducer,
    damageNpc: damageNpcReducer,
    healNpc: healNpcReducer,
    addOvershieldToNpc: addOvershieldToNpcReducer,
  },
});

export const {
  createNpc,
  deleteNpc,
  addFeatureToNpc,
  removeFeatureFromNpc,
  updateNpcStatuses,
  updateNpcConditions,
  updateNpcResistances,
  damageNpc,
  healNpc,
  addOvershieldToNpc,
} = npcSlice.actions;

export const npcsReducer = npcSlice.reducer;
