import { pipe } from "ramda";
import { z } from "zod";
import { RootState } from "../..";
import { lancerData } from "../../../data/lancerData";
import { Bonus } from "../../../schemas/lancerData/bonus.schema";
import { selectActivePilot } from "./selectActivePilot";
import { selectPilot } from "./selectPilot";
import { selectPilotBonuses } from "./selectPilotBonuses";

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

const applyBonus = (stats: PilotStats, bonus: Bonus): PilotStats => {
  switch (bonus.id) {
    case "pilot_armor":
      return {
        ...stats,
        armor: addOrReplace(stats.armor, bonus.val, bonus.replace),
      };
    case "pilot_edef":
      return {
        ...stats,
        edef: addOrReplace(stats.edef, bonus.val, bonus.replace),
      };
    case "pilot_evasion":
      return {
        ...stats,
        evasion: addOrReplace(stats.evasion, bonus.val, bonus.replace),
      };
    case "pilot_gear":
      return {
        ...stats,
        maxGear: addOrReplace(stats.maxGear, bonus.val, bonus.replace),
      };
    case "pilot_hp":
      return {
        ...stats,
        maxHp: addOrReplace(stats.maxHp, bonus.val, bonus.replace),
      };
    case "pilot_speed":
      return {
        ...stats,
        speed: addOrReplace(stats.speed, bonus.val, bonus.replace),
      };
    default:
      return stats;
  }
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
