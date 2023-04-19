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

  const tier = 0;

  const maxHp = npcClass.stats.hp[tier];
  const maxMoves = npcClass.stats.speed[tier];
  const maxHeat =
    (npcClass.stats.heatcap && npcClass.stats.heatcap[tier]) || null;
  const maxActivations = npcClass.stats.activations[tier];
  const maxStress = 1;

  return {
    id: npc.id,
    name: npc.name,
    npcClass,
    mechStatusId: npc.mechStatusId,
    template: npcTemplate,
    features,
    statuses: mechStatus.statuses,
    conditions: mechStatus.conditions,
    resistances: mechStatus.resistances,
    skills: {
      hull: npcClass.stats.hull[tier],
      agility: npcClass.stats.agility[tier],
      systems: npcClass.stats.systems[tier],
      engineering: npcClass.stats.engineering[tier],
      save: npcClass.stats.save[tier],
      edef: npcClass.stats.edef[tier],
      evade: npcClass.stats.evade[tier],
      sensor: npcClass.stats.sensor[tier],
      size: npcClass.stats.size[tier],
    },
    stats: {
      maxHp,
      maxMoves,
      maxHeat,
      maxStress,
      hp: Math.max(maxHp - mechStatus.damageReceived, 0),
      heat: mechStatus.heatReceived,
      moves: maxMoves - mechStatus.movementUsed,
      activations: maxActivations - mechStatus.activationsUsed,
      maxActivations,
      overshield: mechStatus.overshield,
      burn: mechStatus.burnReceived,
      stress: maxStress - mechStatus.stressLost,
    },
  };
};

export type SelectNpcReturns = ReturnType<ReturnType<typeof selectNpcById>>;
