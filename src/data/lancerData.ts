import rawLancerData from "lancer-data";
import { lancerDataSchema } from "../schemas/lancerData/index.schema";
import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { Talent } from "../schemas/lancerData/talent.schema";
import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { Frame } from "../schemas/lancerData/frame.schema";
import { createCollection } from "../utils/collection";

export const lancerData = lancerDataSchema.parse(rawLancerData);

export const lancerCollections = {
  manufacturers: createCollection(lancerData.manufacturers, ["name"]),
  backgrounds: createCollection(lancerData.backgrounds, ["name"]),
  skills: createCollection(lancerData.skills, ["name"]),
  coreBonuses: createCollection(lancerData.coreBonuses as CoreBonus[], [
    "name",
  ]),
  talents: createCollection(lancerData.talents as Talent[], ["name"]),
  pilotGear: createCollection(lancerData.pilotGear as PilotGear[], ["name"]),
  mechFrames: createCollection(lancerData.frames as Frame[], ["name"]),
} as const;
