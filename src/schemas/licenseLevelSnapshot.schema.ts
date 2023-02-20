import { z } from "zod";
import { pilotSkillSchema } from "./pilotSkill.schema";
import { pilotTalentSchema } from "./pilotTalent.schema";

export const licenseLevelSnapshotSchema = z.object({
  skills: pilotSkillSchema.array(),
  talents: pilotTalentSchema.array(),
});

export type LicenseLevelSnapshot = z.infer<typeof licenseLevelSnapshotSchema>;
