import { z } from "zod";
import { pilotSkillSchema } from "./pilotSkill.schema";

export const licenseLevelSnapshotSchema = z.object({
  skills: pilotSkillSchema.array(),
});

export type LicenseLevelSnapshot = z.infer<typeof licenseLevelSnapshotSchema>;
