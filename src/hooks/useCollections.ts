import { Background } from "../schemas/lancerData/background.schema";
import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { Frame } from "../schemas/lancerData/frame.schema";
import { Manufacturer } from "../schemas/lancerData/manufacturer.schema";
import { NpcClass } from "../schemas/lancerData/npcClass.schema";
import { NpcFeature } from "../schemas/lancerData/npcFeature.schema";
import { NpcTemplate } from "../schemas/lancerData/npcTemplate.schema";
import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { Skill } from "../schemas/lancerData/skill.schema";
import { Talent } from "../schemas/lancerData/talent.schema";
import { selectCollections } from "../store/collections/selectors/selectCollections";
import { useAppSelector } from "../store/hooks";
import { Collection } from "../utils/collection";

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

let cache: null | UseCollectionsReturns = null;

export function useCollections(): UseCollectionsReturns {
  return useAppSelector(selectCollections);
}
