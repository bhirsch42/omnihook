import { z } from "zod";

export const mechSkillsSchema = z.object({
  hull: z.number(),
  agility: z.number(),
  systems: z.number(),
  engineering: z.number(),
});

export type MechSkills = z.infer<typeof mechSkillsSchema>;
