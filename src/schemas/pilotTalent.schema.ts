import { z } from "zod";

export const pilotTalentSchema = z.object({
  id: z.string(),
  rank: z.number(),
});

export type PilotTalent = z.infer<typeof pilotTalentSchema>;
