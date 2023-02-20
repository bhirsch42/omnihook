import { pipe } from "ramda";
import { RootState } from "../..";
import { lancerData } from "../../../data/lancerData";
import { selectActivePilot } from "./selectActivePilot";
import { selectPilot } from "./selectPilot";

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

export const selectPilotStats =
  (id: string) =>
  (state: RootState): PilotStats => {
    const pilot = selectPilot(id)(state);
    return pipe(getBaseStats, applyLicenseLevel(pilot.licenseLevel))();
  };
