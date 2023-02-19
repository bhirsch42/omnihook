import { RootState } from "../..";
import { PilotSkill } from "../../../schemas/pilotSkill.schema";
import { selectPilot } from "./selectPilot";
import { selectPilotStats } from "./selectPilotStats";

export const selectUnspentPilotSkillPoints =
  (pilotId: string) =>
  (state: RootState): number => {
    const pilot = selectPilot(pilotId)(state);
    const pilotStats = selectPilotStats(pilotId)(state);

    const spentSkillPoints = pilot.skills.reduce(
      (agg, skill) => agg + skill.rank,
      0
    );

    return pilotStats.pilotSkillPoints - spentSkillPoints;
  };
