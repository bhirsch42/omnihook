import { RootState } from "../..";
import { PilotSkill } from "../../../schemas/pilotSkill.schema";
import { selectPilot } from "./selectPilot";

export const selectPilotSkill =
  ({ pilotId, skillId }: { pilotId: string; skillId: string }) =>
  (state: RootState): PilotSkill => {
    const pilot = selectPilot(pilotId)(state);
    const pilotSkill = pilot.skills.find((skill) => skill.id === skillId);
    if (!pilotSkill) throw new Error(`Could not find pilot skill: ${skillId}`);
    return pilotSkill;
  };
