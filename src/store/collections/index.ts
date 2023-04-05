import { createSlice } from "@reduxjs/toolkit";
import { LancerData } from "../../schemas/lancerData/index.schema";
import { loadLancerDataReducer } from "./reducers/loadLancerData";

export type CollectionsState = Omit<LancerData, "info" | "tables" | "factions">;

export const INITIAL_STATE: CollectionsState = {
  systems: [],
  actions: [],
  backgrounds: [],
  pilotGear: [],
  coreBonuses: [],
  environments: [],
  tags: [],
  frames: [],
  glossary: [],
  manufacturers: [],
  mods: [],
  npcClasses: [],
  npcFeatures: [],
  npcTemplates: [],
  reserves: [],
  rules: {
    overcharge: [],
    baseStructure: 0,
    baseStress: 0,
    baseGrapple: 0,
    baseRam: 0,
    basePilotHp: 0,
    basePilotEvasion: 0,
    basePilotEdef: 0,
    basePilotSpeed: 0,
    minimumPilotSkills: 0,
    minimumMechSkills: 0,
    minimumPilotTalents: 0,
    triggerBonusPerRank: 0,
    maxTriggerRank: 0,
    maxPilotLevel: 0,
    maxPilotWeapons: 0,
    maxPilotArmor: 0,
    maxPilotGear: 0,
    maxFrameSize: 0,
    maxMechArmor: 0,
    maxHase: 0,
    mountFittings: {},
    skillHeaders: [],
  },
  sitreps: [],
  skills: [],
  statuses: [],
  talents: [],
  weapons: [],
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState: INITIAL_STATE,
  reducers: {
    loadLancerData: loadLancerDataReducer,
  },
});

export const { loadLancerData } = collectionSlice.actions;

export const collectionsReducer = collectionSlice.reducer;
