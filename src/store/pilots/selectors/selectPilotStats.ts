import { pipe } from "ramda";
import { RootState } from "../..";
import { lancerData } from "../../../data/lancerData";
import { selectActivePilot } from "./selectActivePilot";

type PilotStats = {
  maxHp: number;
  edef: number;
  evasion: number;
  speed: number;
  pilotSkillPoints: number;
  maxPointsPerSkill: number;
  mechSkillPoints: number;
  talentPoints: number;
  maxPointsPerTalent: number;
  grit: number;
  coreBonusPoints: number;
  armor: number;
};

const getBaseStats = (): PilotStats => {
  const { rules } = lancerData;

  return {
    maxHp: rules.basePilotHp,
    edef: rules.basePilotEdef,
    evasion: rules.basePilotEvasion,
    speed: rules.basePilotSpeed,
    pilotSkillPoints: rules.minimumPilotSkills,
    maxPointsPerSkill: 1,
    mechSkillPoints: rules.minimumMechSkills,
    talentPoints: rules.minimumPilotTalents,
    maxPointsPerTalent: 1,
    grit: 0,
    coreBonusPoints: 0,
    armor: 0,
  };
};

const applyLicenseLevel =
  (licenseLevel: number) =>
  (stats: PilotStats): PilotStats => {
    return {
      ...stats,
      pilotSkillPoints: stats.pilotSkillPoints + licenseLevel,
      maxPointsPerSkill: stats.maxPointsPerSkill + licenseLevel,
      mechSkillPoints: stats.mechSkillPoints + licenseLevel,
      talentPoints: stats.talentPoints + licenseLevel,
      maxPointsPerTalent: stats.maxPointsPerTalent + licenseLevel,
      grit: stats.grit + Math.ceil(licenseLevel / 2),
      coreBonusPoints: stats.coreBonusPoints + Math.floor(licenseLevel / 3),
    };
  };

export function selectPilotStats(state: RootState): PilotStats {
  const pilot = selectActivePilot(state);

  return pipe(getBaseStats, applyLicenseLevel(pilot.licenseLevel))();
}
