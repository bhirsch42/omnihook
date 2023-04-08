import { pipe } from "ramda";
import { z } from "zod";
import { RootState } from "../..";
import { lancerData } from "../../../data/lancerData";
import { Bonus } from "../../../schemas/lancerData/bonus.schema";
import { selectPilot } from "./selectPilot";
import { selectPilotBonuses } from "./selectPilotBonuses";
import { BonusId } from "../../../schemas/lancerData/bonusId.schema";

type PilotStats = {
  armor: number;
  coreBonusPoints: number;
  edef: number;
  evasion: number;
  grit: number;
  maxHp: number;
  maxPointsPerSkill: number;
  maxPointsPerTalent: number;
  mechSkillPoints: number;
  pilotSkillPoints: number;
  speed: number;
  talentPoints: number;
  maxWeapons: number;
  maxArmor: number;
  maxGear: number;
};

const getBaseStats = (): PilotStats => {
  const { rules } = lancerData;

  return {
    armor: 0,
    coreBonusPoints: 0,
    edef: rules.basePilotEdef,
    evasion: rules.basePilotEvasion,
    grit: 0,
    maxHp: rules.basePilotHp,
    maxPointsPerSkill: 1,
    maxPointsPerTalent: 1,
    mechSkillPoints: rules.minimumMechSkills,
    pilotSkillPoints: rules.minimumPilotSkills,
    speed: rules.basePilotSpeed,
    talentPoints: rules.minimumPilotTalents,
    maxWeapons: rules.maxPilotWeapons,
    maxArmor: rules.maxPilotArmor,
    maxGear: rules.maxPilotGear,
  };
};

const applyLicenseLevel =
  (licenseLevel: number) =>
  (stats: PilotStats): PilotStats => {
    return {
      ...stats,
      coreBonusPoints: stats.coreBonusPoints + Math.floor(licenseLevel / 3),
      grit: stats.grit + Math.ceil(licenseLevel / 2),
      maxPointsPerSkill: licenseLevel > 0 ? 3 : stats.maxPointsPerTalent,
      maxPointsPerTalent: licenseLevel > 0 ? 3 : stats.maxPointsPerTalent,
      mechSkillPoints: stats.mechSkillPoints + licenseLevel,
      pilotSkillPoints: stats.pilotSkillPoints + licenseLevel,
      talentPoints: stats.talentPoints + licenseLevel,
    };
  };

const addOrReplace = (
  oldVal: number,
  newVal: Bonus["val"],
  replace: boolean
): number => {
  const parsedNewVal = z.coerce.number().parse(newVal);
  return replace ? parsedNewVal : oldVal + parsedNewVal;
};

const BONUS_TO_STAT: Partial<Record<BonusId, keyof PilotStats>> = {
  pilot_armor: "armor",
  pilot_edef: "edef",
  pilot_evasion: "evasion",
  pilot_gear: "maxGear",
  pilot_hp: "maxHp",
  pilot_speed: "speed",
};

const applyBonus = (stats: PilotStats, bonus: Bonus): PilotStats => {
  const statKey = BONUS_TO_STAT[bonus.id];

  return statKey
    ? {
        ...stats,
        [statKey]: addOrReplace(stats[statKey], bonus.val, bonus.replace),
      }
    : stats;
};

const applyBonuses =
  (bonuses: Bonus[]) =>
  (stats: PilotStats): PilotStats =>
    bonuses.reduce(applyBonus, stats);

export const selectPilotStats =
  (id: string) =>
  (state: RootState): PilotStats => {
    const pilot = selectPilot(id)(state);
    const bonuses = selectPilotBonuses(id)(state);

    return pipe(
      getBaseStats,
      applyLicenseLevel(pilot.licenseLevel),
      applyBonuses(bonuses)
    )();
  };
