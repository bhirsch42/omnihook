import { z } from "zod";
import { pilotSkillSchema } from "./pilotSkill.schema";

export const pilotSchema = z.object({
  id: z.string(),
  name: z.string(),
  callsign: z.string(),
  background: z.string().optional(),
  biography: z.string().optional(),
  description: z.string().optional(),
  licenseLevel: z.number(),
  canReallocate: z.boolean(),
  hp: z.number(),
  skills: pilotSkillSchema.array(),
});

export type Pilot = z.infer<typeof pilotSchema>;
