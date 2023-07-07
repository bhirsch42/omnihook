import { CollectionsState } from "..";
import { RootState } from "../..";
import { Background } from "../../../schemas/lancerData/background.schema";
import { CoreBonus } from "../../../schemas/lancerData/coreBonus.schema";
import { Frame } from "../../../schemas/lancerData/frame.schema";
import { Manufacturer } from "../../../schemas/lancerData/manufacturer.schema";
import { NpcClass } from "../../../schemas/lancerData/npcClass.schema";
import { NpcFeature } from "../../../schemas/lancerData/npcFeature.schema";
import { NpcTemplate } from "../../../schemas/lancerData/npcTemplate.schema";
import { PilotGear } from "../../../schemas/lancerData/pilotGear.schema";
import { Skill } from "../../../schemas/lancerData/skill.schema";
import { Status } from "../../../schemas/lancerData/status.schema";
import { Tag } from "../../../schemas/lancerData/tag.schema";
import { Talent } from "../../../schemas/lancerData/talent.schema";
import { Collection, createCollection } from "../../../utils/collection";

type SelectCollectionsReturns = {
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
  tags: Collection<Tag>;
};

export function selectCollections(state: RootState): SelectCollectionsReturns {
  return {
    manufacturers: createCollection(state.collections.manufacturers, ["name"]),
    backgrounds: createCollection(state.collections.backgrounds, ["name"]),
    skills: createCollection(state.collections.skills, ["name"]),
    coreBonuses: createCollection(
      state.collections.coreBonuses as CoreBonus[],
      ["name"]
    ),
    talents: createCollection(state.collections.talents as Talent[], ["name"]),
    pilotGear: createCollection(state.collections.pilotGear as PilotGear[], [
      "name",
    ]),
    mechFrames: createCollection(state.collections.frames as Frame[], ["name"]),
    npcClasses: createCollection(state.collections.npcClasses as NpcClass[], [
      "name",
    ]),
    npcFeatures: createCollection(
      state.collections.npcFeatures as NpcFeature[],
      ["name"]
    ),
    npcTemplates: createCollection(
      state.collections.npcTemplates as NpcTemplate[],
      ["name"]
    ),
    tags: createCollection(state.collections.tags, ["name"]),
  };
}
