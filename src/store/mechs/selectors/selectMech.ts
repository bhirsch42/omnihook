import { RootState } from "../..";
import { FrameStats } from "../../../schemas/lancerData/frameStats.schema";
import {
  MECH_STAT_KEYS,
  MechStatKey,
} from "../../../schemas/mechStatKey.schema";
import { Modifier } from "../../../schemas/modifier.schema";
import { ModifierDetail } from "../../../schemas/modifierDetail.schema";
import { selectModifiers } from "./selectModifiers";
import * as R from "ramda";

type ModifiedMechStat = {
  value: number;
  modifiers: ModifierDetail[];
};

type ModifiedMechStats = {
  [k in MechStatKey]: ModifiedMechStat;
};

export type SelectMechReturns = {
  pilotMechSkills: {
    hull: number;
    agility: number;
    systems: number;
    engineering: number;
  };
  name: string;
  id: string;
  pilotId: string;
  stats: ModifiedMechStats;
};

function applyModifiers(
  frameStats: FrameStats,
  modifiers: Modifier[]
): ModifiedMechStats {
  const stats: ModifiedMechStats = MECH_STAT_KEYS.reduce(
    (agg, k) => ({
      ...agg,
      [k]: { value: R.propOr(0, k, frameStats), modifiers: [] },
    }),
    {}
  ) as ModifiedMechStats;

  return modifiers.reduce((agg, modifier): ModifiedMechStats => {
    const currentStat = agg[modifier.stat];

    const updatedStat: ModifiedMechStat = {
      value: currentStat.value + modifier.value,
      modifiers: [
        ...currentStat.modifiers,
        { label: modifier.label, value: modifier.value },
      ],
    };

    return { ...agg, [modifier.stat]: updatedStat };
  }, stats);
}

export function selectMech(id: string) {
  return (state: RootState): SelectMechReturns => {
    const mech = state.mechs.all.find((p) => p.id === id);
    if (!mech) throw new Error(`Could not find mech with id ${id}`);
    const pilot = state.pilots.all.find((p) => p.id === mech.pilotId);
    if (!pilot) throw new Error(`Could not find pilot with id ${mech.pilotId}`);
    const frame = state.collections.frames.find(
      (frame) => frame.id === mech.frameId
    );
    if (!frame) throw new Error(`Could not find frame with id ${mech.frameId}`);

    const modifiers = selectModifiers(id)(state);
    const stats = applyModifiers(frame.stats, modifiers);

    return {
      ...mech,
      pilotMechSkills: pilot.mechSkills,
      stats,
    };
  };
}
