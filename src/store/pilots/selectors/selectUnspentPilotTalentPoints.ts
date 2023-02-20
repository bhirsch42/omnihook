import { RootState } from "../..";
import { selectPilot } from "./selectPilot";
import { selectPilotStats } from "./selectPilotStats";

export const selectUnspentPilotTalentPoints =
  (pilotId: string) =>
  (state: RootState): number => {
    const pilot = selectPilot(pilotId)(state);
    const pilotStats = selectPilotStats(pilotId)(state);

    const spentTalentPoints = pilot.talents.reduce(
      (agg, talent) => agg + talent.rank,
      0
    );

    return pilotStats.talentPoints - spentTalentPoints;
  };
