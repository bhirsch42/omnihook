import { RootState } from "../..";
import { selectPilot } from "./selectPilot";
import { selectPilotSkill } from "./selectPilotSkill";

export const selectPilotSkillModifiers =
  (pilotId: string) =>
  (state: RootState): number[] => {
    const pilot = selectPilot(pilotId)(state);
    return pilot.skills.map((skill) => skill.rank * 2);
  };
