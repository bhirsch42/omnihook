import { npcDataSelectors } from "..";
import { RootState } from "../..";
import { selectCollections } from "../../collections/selectors/selectCollections";
import { mechStatusSelectors } from "../../mechStatuses";

export const selectNpcById = (id: string) => (state: RootState) => {
  const npc = npcDataSelectors.selectById(state, id);
  if (!npc) throw new Error(`Could not find npc with id: ${id}`);
  const collections = selectCollections(state);

  const npcClass = collections.npcClasses.find(npc.classId);

  npc.templateId && collections.npcTemplates.find(npc.templateId);

  const npcTemplate = npc.templateId
    ? collections.npcTemplates.find(npc.templateId)
    : undefined;

  const features = collections.npcFeatures.findAll(npc.featureIds);

  const mechStatus = mechStatusSelectors.selectById(state, npc.mechStatusId);

  if (!mechStatus)
    throw new Error(`Could not find mechStatus with id ${npc.mechStatusId}`);

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
    statuses: mechStatus.statuses,
    conditions: mechStatus.conditions,
    resistances: mechStatus.resistances,
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
      hp: Math.max(maxHp - mechStatus.damageReceived, 0),
      heatReceived: Math.min(mechStatus.heatReceived, maxHeat),
      moves: maxMoves - mechStatus.movementUsed,
      activations: maxActivations - mechStatus.activationsUsed,
      maxActivations,
      overshield: mechStatus.overshield,
      burn: mechStatus.burnReceived,
    },
  };
};

export type SelectNpcReturns = ReturnType<ReturnType<typeof selectNpcById>>;
