import { z } from "zod";

export const pilotSkillSchema = z.object({
  id: z.string(),
  rank: z.number(),
});

export type PilotSkill = z.infer<typeof pilotSkillSchema>;
