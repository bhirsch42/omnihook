import rawLancerData from "lancer-data";
import { lancerData } from "./data/lancerData";
import { useCollections } from "./hooks/useCollections";
import npcClasses from "./fixtures/ignore/lancer_core_npcs/npc_classes.json";
import npcFeatures from "./fixtures/ignore/lancer_core_npcs/npc_features.json";
import npcTemplates from "./fixtures/ignore/lancer_core_npcs/npc_templates.json";
import { uniq } from "ramda";

declare global {
  interface Window {
    debug: any;
  }
}

export function useDebug() {
  window.debug = {
    rawLcpData: {
      npcClasses,
      npcFeatures,
      npcTemplates,
    },
    rawLancerData,
    lancerData,
    lancerCollections: useCollections(),

    npcFeatureTypes: uniq(
      useCollections()
        .npcFeatures.all()
        .map((o) => o.type)
    ),
  };
}

// const allBonuses = uniq(
//   reject(
//     isNil,
//     flatten([
//       lancerData.coreBonuses.map((coreBonus) => coreBonus.bonuses),
//       lancerData.frames.map((frame) => frame.coreSystem.activeBonuses),
//       lancerData.pilotGear.map((pilotGear) => pilotGear.bonuses),
//       lancerData.reserves.map((reserve) => reserve.bonuses),
//       lancerData.systems.map((system) => system.bonuses),
//       lancerData.talents.map((talent) =>
//         talent.ranks.map((talentRank) => talentRank.bonuses)
//       ),
//     ])
//   )
// ).map((bonus: unknown) => (bonus as Bonus).id);

// console.log(lancerData.tags.map((tag) => tag.id));

// console.log(allBonuses);
