import { PayloadAction, Draft } from "@reduxjs/toolkit";
import { CollectionsState } from "..";
import { lancerDataSchemaPartial } from "../../../schemas/lancerData/index.schema";

export function loadLancerDataReducer(
  state: Draft<CollectionsState>,
  action: PayloadAction<unknown>
) {
  const payload = lancerDataSchemaPartial.parse(action.payload);

  state.manufacturers = payload.manufacturers
    ? [...state.manufacturers, ...payload.manufacturers]
    : state.manufacturers;

  state.backgrounds = payload.backgrounds
    ? [...state.backgrounds, ...payload.backgrounds]
    : state.backgrounds;

  state.skills = payload.skills
    ? [...state.skills, ...payload.skills]
    : state.skills;

  state.coreBonuses = payload.coreBonuses
    ? [...state.coreBonuses, ...payload.coreBonuses]
    : state.coreBonuses;

  state.talents = payload.talents
    ? [...state.talents, ...payload.talents]
    : state.talents;

  state.pilotGear = payload.pilotGear
    ? [...state.pilotGear, ...payload.pilotGear]
    : state.pilotGear;

  state.frames = payload.frames
    ? [...state.frames, ...payload.frames]
    : state.frames;

  state.npcClasses = payload.npcClasses
    ? [...state.npcClasses, ...payload.npcClasses]
    : state.npcClasses;

  state.npcFeatures = payload.npcFeatures
    ? [...state.npcFeatures, ...payload.npcFeatures]
    : state.npcFeatures;

  state.npcTemplates = payload.npcTemplates
    ? [...state.npcTemplates, ...payload.npcTemplates]
    : state.npcTemplates;

  state.statuses = payload.statuses
    ? [...state.statuses, ...payload.statuses]
    : state.statuses;

  state.tags = payload.tags ? [...state.tags, ...payload.tags] : state.tags;
}
