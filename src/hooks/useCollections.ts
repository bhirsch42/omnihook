import { lancerCollections } from "../data/lancerData";
import rawNpcClasses from "../fixtures/ignore/lancer_core_npcs/npc_classes.json";
import rawNpcFeatures from "../fixtures/ignore/lancer_core_npcs/npc_features.json";
import rawNpcTemplates from "../fixtures/ignore/lancer_core_npcs/npc_templates.json";
import { Background } from "../schemas/lancerData/background.schema";
import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { Frame } from "../schemas/lancerData/frame.schema";
import { Manufacturer } from "../schemas/lancerData/manufacturer.schema";
import {
  NpcClass,
  npcClassSchema,
} from "../schemas/lancerData/npcClass.schema";
import {
  NpcFeature,
  npcFeatureSchema,
} from "../schemas/lancerData/npcFeature.schema";
import {
  NpcTemplate,
  npcTemplateSchema,
} from "../schemas/lancerData/npcTemplate.schema";
import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { Skill } from "../schemas/lancerData/skill.schema";
import { Talent } from "../schemas/lancerData/talent.schema";
import { Collection, createCollection } from "../utils/collection";

type UseCollectionsReturns = {
  manufacturers: Collection<Manufacturer>;
  backgrounds: Collection<Background>;
  skills: Collection<Skill>;
  coreBonuses: Collection<CoreBonus>;
  talents: Collection<Talent>;
  pilotGear: Collection<PilotGear>;
  mechFrames: Collection<Frame>;
  npcClasses: Collection<NpcClass>;
  npcFeatures: Collection<NpcFeature>;
  npcTemplates: Collection<NpcTemplate>;
};

function createNpcCollections() {
  const npcClasses = npcClassSchema.array().parse(rawNpcClasses);
  const npcFeatures = npcFeatureSchema.array().parse(rawNpcFeatures);
  const npcTemplates = npcTemplateSchema.array().parse(rawNpcTemplates);

  return {
    npcClasses: createCollection(npcClasses, ["name"]),
    npcFeatures: createCollection(npcFeatures, ["name"]),
    npcTemplates: createCollection(npcTemplates, ["name"]),
  };
}

let cache: null | UseCollectionsReturns = null;

export function useCollections(): UseCollectionsReturns {
  if (cache) return cache;

  cache = {
    ...lancerCollections,
    ...createNpcCollections(),
  };

  return cache;
}
