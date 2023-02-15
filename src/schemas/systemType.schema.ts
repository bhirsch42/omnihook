import { z } from "zod";

export const systemTypeSchema = z.enum([
  "System",
  "AI",
  "Shield",
  "Deployable",
  "Drone",
  "Tech",
  "Armor",
  "Flight System",
  "Integrated",
  "Mod",
]);

export type SystemType = z.infer<typeof systemTypeSchema>;
