import { RootState } from "../..";
import { selectCollections } from "../../collections/selectors/selectCollections";

export const selectNpc = (id: string) => (state: RootState) => {
  const npc = state.npcs.all.find((o) => o.id === id);
  if (!npc) throw new Error(`Could not find npc with id: ${id}`);
  const collections = selectCollections(state);

  const npcClass = collections.npcClasses.find(npc.classId);

  npc.templateId && collections.npcTemplates.find(npc.templateId);

  const npcTemplate = npc.templateId
    ? collections.npcTemplates.find(npc.templateId)
    : undefined;

  const features = collections.npcFeatures.findAll(npc.featureIds);

  const maxHp = npcClass.stats.hp[npc.tier];
  const maxMoves = npcClass.stats.speed[npc.tier];
  const maxHeat = npcClass.stats.heatcap[npc.tier];
  const maxActivations = npcClass.stats.activations[npc.tier];

  return {
    id: npc.id,
    name: npc.name,
    npcClass,
    template: npcTemplate,
    features,
    statuses: npc.combatStatus.statuses,
    conditions: npc.combatStatus.conditions,
    resistances: npc.combatStatus.resistances,
    skills: {
      hull: npcClass.stats.hull[npc.tier],
      agility: npcClass.stats.agility[npc.tier],
      systems: npcClass.stats.systems[npc.tier],
      engineering: npcClass.stats.engineering[npc.tier],
      save: npcClass.stats.save[npc.tier],
      edef: npcClass.stats.edef[npc.tier],
      evade: npcClass.stats.evade[npc.tier],
      sensor: npcClass.stats.sensor[npc.tier],
    },
    stats: {
      maxHp,
      maxMoves,
      maxHeat,
      hp: Math.max(maxHp - npc.combatStatus.damageReceived, 0),
      heatReceived: Math.min(npc.combatStatus.heatReceived, maxHeat),
      moves: maxMoves - npc.combatStatus.movementUsed,
      activations: maxActivations - npc.combatStatus.activationsUsed,
      maxActivations,
      overshield: npc.combatStatus.overshield,
      burn: npc.combatStatus.burnReceived,
    },
  };
};

export type SelectNpcReturns = ReturnType<ReturnType<typeof selectNpc>>;
